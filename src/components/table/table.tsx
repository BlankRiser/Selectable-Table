/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "../Button";

import { TD, TH, TR, TRHead } from "./table-attributes";

export interface IColumn {
  Header: JSX.Element | string;
  accessor: string;
  Cell?: ({ props }: { props: any }) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface SelectableTableProps {
  size?: "small" | "medium" | "large";
  isSelectable?: boolean;
  columns: IColumn[];
  data: any;
  filteredValue?: string;
  hideColumns?: string[];
  rowsPerPage?: number;
  // handleData?: (data: any) => void;
  handleData: React.Dispatch<React.SetStateAction<any>>;
}

function hasDot(str: string) {
  return str.includes(".");
}

function getKeyValues(obj: any, path: string) {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    current =
      current?.[keys[i]] === null || current?.[keys[i]] === undefined
        ? ""
        : current[keys[i]];
  }
  return current;
  // return path.split('.').reduce((o, key) => o?.[key], obj);
}

export function SelectableTable(props: SelectableTableProps) {
  const {
    size = "medium",
    columns,
    data,
    isSelectable = true,
    hideColumns = [],
    rowsPerPage = 10,
    handleData,
  } = props;

  const checkbox = useRef<any>();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedTableRow, setSelectedTableRow] = useState<any>([]);
  const [tableFilter, setTableFilter] = useState("");
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    setSelectedTableRow([]);
  }, [data]);

  useLayoutEffect(() => {
    if (isSelectable) {
      const isIndeterminate =
        selectedTableRow.length > 0 && selectedTableRow.length < data.length;
      setChecked(selectedTableRow.length === data.length);
      setIndeterminate(isIndeterminate);
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [data.length, isSelectable, selectedTableRow]);

  function toggleAll() {
    setSelectedTableRow(
      checked || indeterminate
        ? []
        : data
            ?.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
            ?.filter((row: { [key: string]: any }) => {
              let isPresent = [];
              if (columns.length < 1) {
                isPresent = [true];
              } else {
                isPresent = columns.map((item) => {
                  return hasDot(item.accessor) &&
                    item.accessor !== "undefined" &&
                    item.accessor !== ""
                    ? getKeyValues(row, item.accessor)
                        .toString()
                        ?.toLowerCase()
                        .includes(tableFilter.toLowerCase())
                    : row[item.accessor]
                        .toLowerCase()
                        .includes(tableFilter.toLowerCase());
                });
              }
              return isPresent.includes(true);
            })
    );
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const filteredColumns = columns.filter(
    (item) => !hideColumns.includes(item.accessor)
  );

  const classes = {
    size: {
      small: `h-[3.2rem]`,
      medium: `h-[4.8rem]`,
      large: `h-[6.4rem]`,
    },
  };
  const StringToObj = (obj: any, path: string) =>
    path.split(".").reduce((r, k) => r?.[k], obj);

  return (
    <>
      <input
        type="text"
        name=""
        placeholder="Search by name, email or role"
        id=""
        className="p-4 w-full text-zinc-400 placeholder:text-zinc-400 bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => setTableFilter(e.target.value)}
      />
      <section className="w-full overflow-x-auto ">
        <table className="w-full  rounded-[2px]">
          <thead className="bg-gray-01 dark:bg-gray-09">
            <TRHead className={`${classes.size[size]} `}>
              {isSelectable && (
                <TH
                  scope="col"
                  className=" w-[2.3rem]  !pl-[2.4rem] pr-[1.6rem] "
                >
                  <input
                    type="checkbox"
                    className=" h-[1.6rem] w-[1.6rem] rounded-[2px] border border-gray-02 dark:border-gray-08  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ref={checkbox}
                    checked={checked}
                    onChange={toggleAll}
                  />
                </TH>
              )}
              {filteredColumns.map((columnCell) => {
                return (
                  <TH
                    key={columnCell.accessor.toString()}
                    className={columnCell.headerClassName}
                    scope="col"
                  >
                    {columnCell.Header}
                  </TH>
                );
              })}
            </TRHead>
          </thead>
          <tbody className="bg-white min-h-screen">
            {data
              ?.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage)
              ?.filter((row: { [key: string]: any }) => {
                let isPresent = [];
                if (columns.length < 1) {
                  isPresent = [true];
                } else {
                  isPresent = columns.map((item) => {
                    return hasDot(item.accessor) &&
                      item.accessor !== "undefined" &&
                      item.accessor !== ""
                      ? getKeyValues(row, item.accessor)
                          .toString()
                          ?.toLowerCase()
                          .includes(tableFilter.toLowerCase())
                      : row[item.accessor]
                          .toLowerCase()
                          .includes(tableFilter.toLowerCase());
                  });
                }
                return isPresent.includes(true);
              })
              ?.map((rowCell: any, index: any) => {
                return (
                  <TR
                    key={index}
                    isSelected={selectedTableRow.includes(rowCell)}
                    className={`${classes.size[size]}`}
                  >
                    {isSelectable && (
                      <TD className="!pl-[2.4rem] !pr-[1.6rem]">
                        <input
                          type="checkbox"
                          value={rowCell.email}
                          checked={selectedTableRow.includes(rowCell)}
                          className=""
                          onChange={(e) =>
                            setSelectedTableRow(
                              e.target.checked
                                ? [...selectedTableRow, rowCell]
                                : selectedTableRow.filter(
                                    (row: any) => row !== rowCell
                                  )
                            )
                          }
                        />
                      </TD>
                    )}
                    {filteredColumns?.map((columnCell: any, idx: number) => {
                      const { Cell } = columnCell;
                      return (
                        <>
                          <TD
                            key={index + idx}
                            className={columnCell.className}
                          >
                            {columnCell.Cell ? (
                              <Cell props={rowCell} />
                            ) : (
                              StringToObj(rowCell, columnCell.accessor)
                            )}
                          </TD>
                        </>
                      );
                    })}
                  </TR>
                );
              })}
          </tbody>
        </table>
        <div className="p-4 flex gap-4 justify-between transition-transform ease-in-out">
          <Button disabled={activePage === 1} onClick={() => setActivePage(1)}>
            ⏪
          </Button>
          <div className="flex gap-4">
            <Button
              disabled={activePage === 1}
              onClick={() => setActivePage(activePage - 1)}
            >
              ◀️
            </Button>
            {selectedTableRow.length > 0 && (
              <>
                <Button
                  onClick={() => {
                    handleData((prev: any) => {
                      const mutatedData = prev.filter((item: any) => {
                        return !selectedTableRow.includes(item);
                      });
                      return mutatedData;
                    });
                  }}
                >
                  Delete Selected
                </Button>
              </>
            )}
            <Button
              disabled={activePage === totalPages}
              onClick={() => setActivePage(activePage + 1)}
            >
              ▶️
            </Button>
          </div>
          <Button
            disabled={activePage === totalPages}
            onClick={() => setActivePage(totalPages)}
          >
            ⏩
          </Button>
        </div>
      </section>
    </>
  );
}
