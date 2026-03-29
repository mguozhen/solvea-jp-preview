'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { ChatDemoShowCompletedContext } from '../ChatDemo/ChatDemoContext';
import styles from './index.module.scss';

type CalendarDemoProps =
    | {
        type: 'single';
        date: { year: number; month: number; day: number };
        time: { hour: number; minute: number; period?: 'AM' | 'PM' };
    }
    | {
        type: 'dateRange';
        start: { year: number; month: number; day: number; hour?: number; minute?: number; period?: 'AM' | 'PM' };
        end: { year: number; month: number; day: number; hour?: number; minute?: number; period?: 'AM' | 'PM' };
    }
    | {
        type: 'timeRange';
        date: { year: number; month: number; day: number };
        start: { hour: number; minute: number; period?: 'AM' | 'PM' };
        end: { hour: number; minute: number; period?: 'AM' | 'PM' };
    };

type Step = 'calendar' | 'time' | 'completed';

export default function CalendarDemo(props: CalendarDemoProps) {
    const showCompletedState = useContext(ChatDemoShowCompletedContext);

    const [currentStep, setCurrentStep] = useState<Step>(showCompletedState ? 'completed' : 'calendar');
    const [selectedDate, setSelectedDate] = useState<number | null>(showCompletedState && (props.type === 'single' || props.type === 'timeRange') ? props.date.day : null);
    const [selectedDateRange, setSelectedDateRange] = useState<{ start: number | null; end: number | null } | null>(
        showCompletedState && props.type === 'dateRange' ? { start: props.start.day, end: props.end.day } : null
    );
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedTimeRange, setSelectedTimeRange] = useState<{ start: string; end: string } | null>(null);
    const [cursorPosition, setCursorPosition] = useState<{ top: number; left: number } | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(!!showCompletedState);

    // dateRange 类型的时间选择状态
    const [showDateRangeTime, setShowDateRangeTime] = useState(
        !!(showCompletedState && props.type === 'dateRange' && props.start.hour !== undefined)
    );
    const [dateRangeStartTime, setDateRangeStartTime] = useState<string | null>(null);
    const [dateRangeEndTime, setDateRangeEndTime] = useState<string | null>(null);

    const calendarRef = useRef<HTMLDivElement>(null);
    const timeSlotRef = useRef<HTMLDivElement>(null);
    const completedStateSyncedRef = useRef(false);

    // 获取当前场景的日期信息
    const getDateInfo = ():
        | { year: number; month: number; day: number }
        | { start: { year: number; month: number; day: number }; end: { year: number; month: number; day: number } } => {
        if (props.type === 'single' || props.type === 'timeRange') {
            return { year: props.date.year, month: props.date.month, day: props.date.day };
        }
        // props.type === 'dateRange'
        return {
            start: { year: props.start.year, month: props.start.month, day: props.start.day },
            end: { year: props.end.year, month: props.end.month, day: props.end.day }
        };
    };

    // 生成单个月份的日历数据
    const generateMonthCalendar = (year: number, month: number) => {
        const firstDay = new Date(year, month - 1, 1).getDay();
        const daysInMonth = new Date(year, month, 0).getDate();
        const days: (number | null)[] = [];

        // 填充前面的空位
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // 填充日期
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return { days, year, month };
    };

    // 生成日历数据（支持多个月份）
    const generateCalendar = (): Array<{ days: (number | null)[]; year: number; month: number }> => {
        const dateInfo = getDateInfo();

        if (props.type === 'single' || props.type === 'timeRange') {
            if ('year' in dateInfo) {
                return [generateMonthCalendar(dateInfo.year, dateInfo.month)];
            }
            return [];
        } else {
            // 日期范围：可能需要显示多个月份
            if ('start' in dateInfo && 'end' in dateInfo) {
                const start = dateInfo.start;
                const end = dateInfo.end;
                const calendars: Array<{ days: (number | null)[]; year: number; month: number }> = [];

                // 计算需要显示的月份
                const startDate = new Date(start.year, start.month - 1, 1);
                const endDate = new Date(end.year, end.month - 1, 1);

                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    calendars.push(generateMonthCalendar(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1
                    ));
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }

                return calendars;
            }
            return [];
        }
    };

    const calendarMonths = generateCalendar();

    // 格式化时间
    const formatTime = (h: number, m: number, p?: 'AM' | 'PM') => {
        const displayHour = h > 12 ? h - 12 : (h === 0 ? 12 : h);
        const displayPeriod = p || (h >= 12 ? 'PM' : 'AM');
        return `${displayHour}:${m.toString().padStart(2, '0')} ${displayPeriod}`;
    };

    // 转换为24小时制
    const to24Hour = (hour: number, period?: 'AM' | 'PM') => {
        if (period === 'PM' && hour !== 12) {
            return hour + 12;
        } else if (period === 'AM' && hour === 12) {
            return 0;
        }
        return hour;
    };

    // 生成时间选项（展示12个，30分钟间隔，确保传入时间被包含）
    const generateTimeSlots = () => {
        const slots: string[] = [];
        const slotMinutes: number[] = [];

        if (props.type === 'single') {
            const hour24 = to24Hour(props.time.hour, props.time.period);
            const targetMinutes = hour24 * 60 + props.time.minute;

            // 计算起始时间：目标时间往前5个时间段（2.5小时），确保目标时间在中间位置
            let startMinutes = targetMinutes - (5 * 30);
            if (startMinutes < 0) startMinutes = 0;
            // 确保不超过结尾
            if (startMinutes + 11 * 30 >= 24 * 60) {
                startMinutes = 24 * 60 - 12 * 30;
            }

            // 生成12个时间点
            for (let i = 0; i < 12; i++) {
                const totalMinutes = startMinutes + (i * 30);
                slotMinutes.push(totalMinutes);
            }

            // 确保目标时间在列表中（替换最接近的时间点）
            if (!slotMinutes.includes(targetMinutes)) {
                // 找到最接近的位置并替换
                let closestIdx = 0;
                let minDiff = Math.abs(slotMinutes[0] - targetMinutes);
                for (let i = 1; i < slotMinutes.length; i++) {
                    const diff = Math.abs(slotMinutes[i] - targetMinutes);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestIdx = i;
                    }
                }
                slotMinutes[closestIdx] = targetMinutes;
                slotMinutes.sort((a, b) => a - b);
            }

            // 转换为时间字符串
            for (const minutes of slotMinutes) {
                const h = Math.floor(minutes / 60);
                const m = minutes % 60;
                slots.push(formatTime(h, m));
            }
        } else if (props.type === 'timeRange') {
            const startHour24 = to24Hour(props.start.hour, props.start.period);
            const endHour24 = to24Hour(props.end.hour, props.end.period);
            const startTargetMinutes = startHour24 * 60 + props.start.minute;
            const endTargetMinutes = endHour24 * 60 + props.end.minute;

            // 计算需要包含的时间范围
            const rangeSpan = endTargetMinutes - startTargetMinutes;
            // 在范围前后各留一些空间
            const beforeSlots = Math.max(2, Math.floor((12 - Math.ceil(rangeSpan / 30) - 1) / 2));

            let baseMinutes = startTargetMinutes - (beforeSlots * 30);
            if (baseMinutes < 0) baseMinutes = 0;
            if (baseMinutes + 11 * 30 >= 24 * 60) {
                baseMinutes = 24 * 60 - 12 * 30;
            }

            // 生成12个时间点
            for (let i = 0; i < 12; i++) {
                const totalMinutes = baseMinutes + (i * 30);
                slotMinutes.push(totalMinutes);
            }

            // 确保开始时间在列表中
            if (!slotMinutes.includes(startTargetMinutes)) {
                let closestIdx = 0;
                let minDiff = Math.abs(slotMinutes[0] - startTargetMinutes);
                for (let i = 1; i < slotMinutes.length; i++) {
                    const diff = Math.abs(slotMinutes[i] - startTargetMinutes);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestIdx = i;
                    }
                }
                slotMinutes[closestIdx] = startTargetMinutes;
            }

            // 确保结束时间在列表中
            if (!slotMinutes.includes(endTargetMinutes)) {
                let closestIdx = 0;
                let minDiff = Math.abs(slotMinutes[0] - endTargetMinutes);
                for (let i = 1; i < slotMinutes.length; i++) {
                    const diff = Math.abs(slotMinutes[i] - endTargetMinutes);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closestIdx = i;
                    }
                }
                slotMinutes[closestIdx] = endTargetMinutes;
            }

            // 排序并去重
            const uniqueMinutes = Array.from(new Set(slotMinutes)).sort((a, b) => a - b);

            // 转换为时间字符串
            for (const minutes of uniqueMinutes) {
                const h = Math.floor(minutes / 60);
                const m = minutes % 60;
                slots.push(formatTime(h, m));
            }
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    // 获取目标时间
    const getTargetTime = () => {
        if (props.type === 'single') {
            return formatTime(
                to24Hour(props.time.hour, props.time.period),
                props.time.minute
            );
        } else if (props.type === 'timeRange') {
            return {
                start: formatTime(
                    to24Hour(props.start.hour, props.start.period),
                    props.start.minute
                ),
                end: formatTime(
                    to24Hour(props.end.hour, props.end.period),
                    props.end.minute
                )
            };
        } else if (props.type === 'dateRange' && props.start.hour !== undefined && props.end.hour !== undefined) {
            return {
                start: formatTime(
                    to24Hour(props.start.hour, props.start.period),
                    props.start.minute || 0
                ),
                end: formatTime(
                    to24Hour(props.end.hour, props.end.period),
                    props.end.minute || 0
                )
            };
        }
        return null;
    };

    const targetTime = getTargetTime();

    // 当以“已播放完成”态展示时，同步时间选择状态（targetTime 依赖 props，在首轮渲染后可用）
    useEffect(() => {
        if (!showCompletedState || completedStateSyncedRef.current || targetTime == null) return;
        completedStateSyncedRef.current = true;
        if (props.type === 'single' && typeof targetTime === 'string') {
            setSelectedTime(targetTime);
        } else if (props.type === 'timeRange' && typeof targetTime === 'object') {
            setSelectedTimeRange({ start: targetTime.start, end: targetTime.end });
        } else if (props.type === 'dateRange' && typeof targetTime === 'object') {
            setDateRangeStartTime(targetTime.start);
            setDateRangeEndTime(targetTime.end);
        }
    }, [showCompletedState, props.type, targetTime]);

    // 步骤1: 日历选择动画
    useEffect(() => {
        if (showCompletedState) return;
        if (currentStep !== 'calendar' || !calendarRef.current) return;

        setIsAnimating(true);

        // 设置鼠标初始位置（左上角）
        setCursorPosition({
            top: 10,
            left: 10
        });

        if (props.type === 'single' || props.type === 'timeRange') {
            // 单个时间或时间范围：选择单个日期
            const targetDay = props.date.day;
            const dayElements = calendarRef.current.querySelectorAll(`[data-day="${targetDay}"][data-year="${props.date.year}"][data-month="${props.date.month}"]`);

            if (dayElements.length === 0) return;

            const targetElement = dayElements[0] as HTMLElement;

            // 延迟后移动鼠标到目标日期
            setTimeout(() => {
                const rect = targetElement.getBoundingClientRect();
                const calendarRect = calendarRef.current!.getBoundingClientRect();

                setCursorPosition({
                    top: rect.top - calendarRect.top + rect.height / 2 + 2,
                    left: rect.left - calendarRect.left + rect.width / 2 + 2
                });

                // 鼠标到达后，选中日期
                setTimeout(() => {
                    targetElement.classList.add(styles.clicking);
                    setTimeout(() => {
                        targetElement.classList.remove(styles.clicking);
                        setSelectedDate(targetDay);
                        setIsAnimating(false);
                    }, 100);

                    // 进入时间选择步骤
                    setTimeout(() => {
                        setCurrentStep('time');
                    }, 400);
                }, 200);
            }, 200);
        } else if (props.type === 'dateRange') {
            // 日期范围：先选择开始日期，再选择结束日期
            const startDay = props.start.day;
            const endDay = props.end.day;

            // 选择开始日期
            setTimeout(() => {
                const startElements = calendarRef.current!.querySelectorAll(
                    `[data-day="${startDay}"][data-year="${props.start.year}"][data-month="${props.start.month}"]`
                );

                if (startElements.length === 0) return;
                const startElement = startElements[0] as HTMLElement;

                const rect = startElement.getBoundingClientRect();
                const calendarRect = calendarRef.current!.getBoundingClientRect();

                setCursorPosition({
                    top: rect.top - calendarRect.top + rect.height / 2 + 2,
                    left: rect.left - calendarRect.left + rect.width / 2 + 2
                });

                setTimeout(() => {
                    startElement.classList.add(styles.clicking);
                    setTimeout(() => {
                        startElement.classList.remove(styles.clicking);
                        setSelectedDateRange({ start: startDay, end: null });
                    }, 100);

                    // 选择结束日期
                    setTimeout(() => {
                        const endElements = calendarRef.current!.querySelectorAll(
                            `[data-day="${endDay}"][data-year="${props.end.year}"][data-month="${props.end.month}"]`
                        );

                        if (endElements.length === 0) return;
                        const endElement = endElements[0] as HTMLElement;

                        const endRect = endElement.getBoundingClientRect();
                        const calendarRect2 = calendarRef.current!.getBoundingClientRect();

                        setCursorPosition({
                            top: endRect.top - calendarRect2.top + endRect.height / 2 + 2,
                            left: endRect.left - calendarRect2.left + endRect.width / 2 + 2
                        });

                        setTimeout(() => {
                            endElement.classList.add(styles.clicking);
                            setTimeout(() => {
                                endElement.classList.remove(styles.clicking);
                                setSelectedDateRange({ start: startDay, end: endDay });
                                setIsAnimating(false);

                                // 如果有时间参数，显示时间选择；否则结束演示
                                if (props.start.hour !== undefined) {
                                    setTimeout(() => {
                                        setShowDateRangeTime(true);
                                    }, 200);
                                } else {
                                    setTimeout(() => {
                                        setIsCompleted(true);
                                        setCurrentStep('completed');
                                    }, 100);
                                }
                            }, 100);
                        }, 200);
                    }, 400);
                }, 200);
            }, 200);
        }
    }, [showCompletedState, currentStep, props]);

    // dateRange 时间选择动画
    useEffect(() => {
        if (showCompletedState) return;
        if (!showDateRangeTime || props.type !== 'dateRange') return;
        if (!targetTime || typeof targetTime !== 'object') return;

        // 延迟后选择开始时间
        setTimeout(() => {
            setDateRangeStartTime(targetTime.start);

            // 延迟后选择结束时间
            setTimeout(() => {
                setDateRangeEndTime(targetTime.end);

                // 演示完成
                setTimeout(() => {
                    setIsCompleted(true);
                    setCurrentStep('completed');
                }, 300);
            }, 400);
        }, 300);
    }, [showCompletedState, showDateRangeTime, props, targetTime]);

    // 步骤2: 时间选择动画（无鼠标，直接选中）
    useEffect(() => {
        if (showCompletedState) return;
        if (currentStep !== 'time') return;

        setIsAnimating(true);

        if (props.type === 'single' && typeof targetTime === 'string') {
            // 单个时间点选择：延迟后直接选中
            setTimeout(() => {
                setSelectedTime(targetTime);
                setIsAnimating(false);

                // 演示完成
                setTimeout(() => {
                    setIsCompleted(true);
                    setCurrentStep('completed');
                }, 300);
            }, 300);
        } else if (props.type === 'timeRange' && targetTime && typeof targetTime === 'object') {
            // 时间范围选择：先选开始时间，再选结束时间
            setTimeout(() => {
                setSelectedTimeRange({ start: targetTime.start, end: '' });

                // 选择结束时间
                setTimeout(() => {
                    setSelectedTimeRange({ start: targetTime.start, end: targetTime.end });
                    setIsAnimating(false);

                    // 演示完成
                    setTimeout(() => {
                        setIsCompleted(true);
                        setCurrentStep('completed');
                    }, 300);
                }, 400);
            }, 300);
        }
    }, [showCompletedState, currentStep, targetTime, props]);

    const getMonthName = (month: number) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[month - 1];
    };

    const getDayAbbr = (index: number) => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return days[index];
    };

    const isTimeInRange = (slot: string) => {
        if (!selectedTimeRange || !selectedTimeRange.start || !selectedTimeRange.end) return false;
        const slotIndex = timeSlots.indexOf(slot);
        const startIndex = timeSlots.indexOf(selectedTimeRange.start);
        const endIndex = timeSlots.indexOf(selectedTimeRange.end);
        return slotIndex >= startIndex && slotIndex <= endIndex;
    };

    const isDateInRange = (day: number | null, year: number, month: number) => {
        if (!selectedDateRange || day === null) return false;
        if (props.type !== 'dateRange') return false;

        const startDate = new Date(props.start.year, props.start.month - 1, props.start.day);
        const endDate = new Date(props.end.year, props.end.month - 1, props.end.day);
        const currentDate = new Date(year, month - 1, day);

        return currentDate >= startDate && currentDate <= endDate;
    };

    const isDateSelected = (day: number | null, year: number, month: number) => {
        if (day === null) return false;

        if (props.type === 'single' || props.type === 'timeRange') {
            return selectedDate === day && year === props.date.year && month === props.date.month;
        } else if (props.type === 'dateRange') {
            if (!selectedDateRange) return false;

            return (selectedDateRange.start === day && year === props.start.year && month === props.start.month) ||
                (selectedDateRange.end === day && year === props.end.year && month === props.end.month);
        }
        return false;
    };

    const shouldShowDot = (day: number | null, year: number, month: number) => {
        if (day === null) return false;

        if (props.type === 'single' || props.type === 'timeRange') {
            return day === props.date.day && year === props.date.year && month === props.date.month && day !== selectedDate;
        } else if (props.type === 'dateRange') {
            return (day === props.start.day && year === props.start.year && month === props.start.month) ||
                (day === props.end.day && year === props.end.year && month === props.end.month);
        }
        return false;
    };

    return (
        <div className={styles.calendarDemo}>
            {(currentStep === 'calendar' || (currentStep === 'completed' && props.type === 'dateRange')) && (
                <div className={styles.calendarContainer} ref={calendarRef}>
                    {calendarMonths.map((calendar) => (
                        <div key={`${calendar.year}-${calendar.month}`} className={styles.calendarMonth}>
                            <div className={styles.calendarHeader}>
                                <div className={styles.monthYear}>
                                    {getMonthName(calendar.month)} {calendar.year}
                                </div>
                                <div className={styles.navigation}>
                                    <button className={styles.navButton} disabled={isCompleted}>&lt;</button>
                                    <button className={styles.navButton} disabled={isCompleted}>&gt;</button>
                                </div>
                            </div>
                            <div className={styles.daysOfWeek}>
                                {[0, 1, 2, 3, 4, 5, 6].map(day => (
                                    <div key={day} className={styles.dayLabel}>
                                        {getDayAbbr(day)}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.calendarGrid}>
                                {calendar.days.map((day, index) => {
                                    const inRange = isDateInRange(day, calendar.year, calendar.month);
                                    const isSelected = isDateSelected(day, calendar.year, calendar.month);

                                    return (
                                        <div
                                            key={`${calendar.year}-${calendar.month}-${index}`}
                                            data-day={day}
                                            data-year={calendar.year}
                                            data-month={calendar.month}
                                            className={`${styles.calendarDay} ${isSelected ? styles.selected : ''
                                                } ${inRange ? styles.inDateRange : ''
                                                } ${day === null ? styles.empty : ''
                                                }`}
                                            style={{ pointerEvents: isCompleted ? 'none' : 'auto' }}
                                        >
                                            {day}
                                            {shouldShowDot(day, calendar.year, calendar.month) && (
                                                <div className={styles.dot}></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* dateRange 时间选择下拉框 */}
                    {showDateRangeTime && props.type === 'dateRange' && (
                        <div className={styles.dateRangeTimeSelect}>
                            <div className={styles.timeSelectRow}>
                                <div className={styles.timeSelectLabel}>Start</div>
                                <div className={`${styles.timeSelectDropdown} ${dateRangeStartTime ? styles.selected : ''}`}>
                                    {dateRangeStartTime || 'Select time'}
                                    <span className={styles.dropdownArrow}>▼</span>
                                </div>
                            </div>
                            <div className={styles.timeSelectRow}>
                                <div className={styles.timeSelectLabel}>End</div>
                                <div className={`${styles.timeSelectDropdown} ${dateRangeEndTime ? styles.selected : ''}`}>
                                    {dateRangeEndTime || 'Select time'}
                                    <span className={styles.dropdownArrow}>▼</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {cursorPosition && !showDateRangeTime && (
                        <div
                            className={styles.cursor}
                            style={{
                                top: `${cursorPosition.top}px`,
                                left: `${cursorPosition.left}px`,
                                transition: isAnimating ? 'all 0.5s ease-in-out' : 'none'
                            }}
                        />
                    )}
                </div>
            )}

            {(currentStep === 'time' || currentStep === 'completed') && props.type !== 'dateRange' && (
                <div className={styles.timeContainer} ref={timeSlotRef}>
                    <div className={styles.timeGrid}>
                        {timeSlots.map((slot, index) => {
                            if (props.type === 'single') {
                                const isSelected = selectedTime === slot;

                                return (
                                    <div
                                        key={index}
                                        data-time-slot={slot}
                                        className={`${styles.timeSlot} ${isSelected ? styles.selected : ''
                                            }`}
                                        style={{ pointerEvents: isCompleted ? 'none' : 'auto' }}
                                    >
                                        {slot}
                                    </div>
                                );
                            } else if (props.type === 'timeRange') {
                                const isStart = selectedTimeRange?.start === slot;
                                const isEnd = selectedTimeRange?.end === slot;
                                const inRange = isTimeInRange(slot);

                                return (
                                    <div
                                        key={index}
                                        data-time-slot={slot}
                                        className={`${styles.timeSlot} ${isStart ? styles.startTime : ''
                                            } ${isEnd ? styles.endTime : ''
                                            } ${inRange ? styles.inRange : ''
                                            }`}
                                        style={{ pointerEvents: isCompleted ? 'none' : 'auto' }}
                                    >
                                        {slot}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
