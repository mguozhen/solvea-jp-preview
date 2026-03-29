import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { IPackageItem, PayDateType } from './interface';
import CycleSwitch from './mod/CycleSwitch';
import PackageItem from './mod/PackageItem';
import { formatPackageList } from './mod/PackageItem/format';

interface Props {
  title: string;
  description: string;
  h1: boolean;
  jumpLink: string;
  initialPlanList?: IPackageItem[];
}

export default function SolveaSubscribe(props: Props) {
  const { title, description, h1, jumpLink = 'https://apps-staging.solvea.cx/#/pricing', initialPlanList } = props;
  // 周期
  const [billCycleSelected, setBillCycleSelected] = useState<PayDateType>('monthly');
  // 动态配额套餐列表
  const [listAllPlan, setListAllPlan] = useState<IPackageItem[]>(initialPlanList ?? []);
  // 将动态配额列表塞到前端结构里
  const packageList = formatPackageList(listAllPlan, billCycleSelected);

  const getListAllPlan = async () => {
    const isStaging = window.location.host.includes('staging');
    const response = await fetch(
      isStaging
        ? 'https://apps-staging.solvea.cx/api_v2/plg/commerce/product/listAllPlgOfficialPlan'
        : 'https://app.solvea.cx/api_v2/plg/commerce/product/listAllPlgOfficialPlan',
    );
    const result = await response.json();
    setListAllPlan(result.data);
  };

  useEffect(() => {
    getListAllPlan();
  }, []);

  return (
    <div className={styles.container}>
      {h1 ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
      <div className={styles.description}>{description}</div>

      <div className={styles.content}>
        <div className={styles.page}>
          <div className={styles.header}>
            <CycleSwitch value={billCycleSelected} onChange={(v) => setBillCycleSelected(v)} />
          </div>
          <div className={styles.main}>
            <div className={styles.pageContent}>
              <div className={styles.packageList}>
                {packageList?.map((item) => {
                  return (
                    <PackageItem
                      key={item?.key}
                      data={item as any}
                      billCycleSelected={billCycleSelected}
                      jumpLink={jumpLink}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
