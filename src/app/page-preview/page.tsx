'use client';

import LandingPage from '../mod/LandingPageRender';
import React, {
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { parseJSON } from 'shulex-util';
import styles from './index.module.scss';
import cx from 'classnames';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

function SortComponent(props: PropsWithChildren<any>) {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
}

const SortableList = SortableContainer<any>(({ children }) => {
  return children;
});

const SortableItem = SortableElement<any>(SortComponent);

export default function Preview() {
  const [sortStartTime, setSortTime] = useState(Date.now());
  const [data, setData] = useState<any>({});
  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== 'object') {
        return;
      }
      const isIFrame = window.parent !== window.self;
      if (isIFrame) {
        window.parent.postMessage({ msg: 'connect' }, '*');
      }
      window.addEventListener('message', (e) => {
        const data = parseJSON(e.data);
        console.log(e.data);
        if (data?.type === 'datachange') {
          setData(Object.assign({}, data.data));
        }
      });
    }, 500);
  }, []);
  return (
    <div className={styles.page}>
      <LandingPage
        data={data}
        backgroundColor={data?.backgroundColor}
        theme={data?.theme}
        styleConfig={{
          headerStyleConfig: {
            backgroundColor: '#17171b',
          },
        }}
        headerSticky={false}
        renderWrapper={(comp, schema, index) => {
          const { type, uuid } = schema;
          const isContainer = type === 'Container';
          const compRender = (
            <div
              className={cx(styles.hoverEdit, {
                [styles.isContainer]: isContainer,
              })}
              id={uuid}
              onClick={(e) => {
                // 只点Container有用标志
                if (isContainer) {
                  return;
                }
                e.stopPropagation();
                e.preventDefault();
                console.log('post message: ', {
                  type: 'clickOn',
                  data: {
                    schema,
                  },
                });
                const isIFrame = window.parent !== window.self;
                if (isIFrame) {
                  window.parent.postMessage(
                    JSON.stringify({
                      type: 'clickOn',
                      data: {
                        schema,
                      },
                    }),
                    '*',
                  );
                }
              }}
            >
              {isContainer && (
                <div
                  className={styles.containerHandler}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log('post message: ', {
                      type: 'clickOn',
                      data: {
                        schema,
                      },
                    });
                    const isIFrame = window.parent !== window.self;
                    if (isIFrame) {
                      window.parent.postMessage(
                        JSON.stringify({
                          type: 'clickOn',
                          data: {
                            schema,
                          },
                        }),
                        '*',
                      );
                    }
                  }}
                >
                  Container
                </div>
              )}
              {comp}
              <div className={styles.hint}>
                Click to edit
                <br />
                {type}
                <br />
                {uuid}
              </div>
            </div>
          );
          if (isContainer) {
            return (
              <SortableList
                onSortStart={() => {
                  setSortTime(Date.now());
                }}
                onSortMove={(e) => {
                  const screenY = e.clientY;
                  console.log(e);
                  if (screenY < 100) {
                    // scroll up
                    window.scrollBy(0, -10);
                  }
                  if (screenY > window.innerHeight - 100) {
                    // scroll down
                    window.scrollBy(0, 10);
                  }
                }}
                onSortEnd={({ oldIndex, newIndex }) => {
                  const dist = Date.now() - sortStartTime;
                  const isClick = dist < 500 && oldIndex === newIndex;
                  const isIFrame = window.parent !== window.self;
                  if (isIFrame) {
                    if (isClick) {
                      console.log('clickOn: ', {
                        data: {
                          schema: schema?.subComponents?.[oldIndex],
                        },
                      });
                      window.parent.postMessage(
                        JSON.stringify({
                          type: 'clickOn',
                          data: {
                            schema: schema?.subComponents?.[oldIndex],
                          },
                        }),
                        '*',
                      );
                    } else {
                      console.log('sortComponent: ', {
                        data: {
                          schema,
                          oldIndex,
                          newIndex,
                        },
                      });
                      window.parent.postMessage(
                        JSON.stringify({
                          type: 'sortComponent',
                          data: {
                            schema,
                            oldIndex,
                            newIndex,
                          },
                        }),
                        '*',
                      );
                    }
                  }
                }}
              >
                {compRender}
              </SortableList>
            );
          }
          return <SortableItem index={index}>{compRender}</SortableItem>;
        }}
      />
    </div>
  );
}
