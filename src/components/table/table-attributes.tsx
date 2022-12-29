import { HTMLAttributes, ReactNode, ThHTMLAttributes } from "react";

interface TRHeadProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  isSelected?: boolean;
}

export const TRHead = (props: TRHeadProps) => {
  const { children, isSelected, ...rest } = props;
  return (
    <tr
      {...rest}
      className={` ${
        isSelected ? "bg-blue-06 dark:bg-blue-500" : null
      } border-b- whitespace-nowrap border-neutral-200 bg-neutral-100 pl-[1.6rem] text-left text-[1.2rem]
        font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400
        ${rest.className}
        `}
    >
      {children}
    </tr>
  );
};

interface THprops extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: ReactNode;
}

export const TH = (props: THprops) => {
  const { children, scope = "col", ...rest } = props;
  return (
    <th
      {...rest}
      scope={scope}
      className={` whitespace-nowrap pl-[1.6rem] pr-[1.6rem] text-left text-[1.2rem] font-semibold text-neutral-700 dark:text-neutral-400
      ${rest.className}
      `}
    >
      {children}
    </th>
  );
};

interface TRProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  isSelected?: boolean;
}

export const TR = (props: TRProps) => {
  const { children, isSelected, ...rest } = props;
  return (
    <tr
      {...rest}
      className={` ${
        isSelected
          ? "bg-blue-100 dark:bg-neutral-900"
          : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
      } whitespace-nowrap border-b-[.1rem] border-neutral-100 bg-white pl-[2.4rem] text-left text-[1.2rem] font-semibold text-neutral-10
      dark:border-neutral-800 dark:bg-neutral-900 dark:text-white 
      ${rest.className}
      `}
    >
      {children}
    </tr>
  );
};
interface TDProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

// TODO: clamp the text for larger screens

export const TD = (props: TDProps) => {
  const { children, ...rest } = props;
  return (
    <td
      {...rest}
      // max-w-[30ch]
      className={` overflow-ellipsis whitespace-nowrap 
      pl-[1.6rem] pr-[1.6rem] text-[1.2rem] font-normal text-neutral-800 dark:text-neutral-200
      ${rest.className}
      `}
    >
      {children}
    </td>
  );
};
