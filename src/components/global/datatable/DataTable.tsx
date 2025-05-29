import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Column<T> = {
  header: string;
  accessor: keyof T;
  className?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  caption?: string;
  data: T[];
  columns: Column<T>[];
  footerTotal?: React.ReactNode;
  title?: string;
  footerTotalLabel?: string;
}

export function DataTable<T>({ caption, data, columns, footerTotal, title, footerTotalLabel }: DataTableProps<T>) {
  return (
    <div className="lg:p-10">
      <div className="my-5 font-bold">
        <h1>{title}</h1>
      </div>
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              {columns.map((col, colIdx) => (
                <TableCell key={colIdx} className={col.className}>
                  {col.render ? col.render(row[col.accessor], row) : (row[col.accessor] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        {footerTotal && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length - 1}>{footerTotalLabel ? footerTotalLabel : 'Total'}</TableCell>
              <TableCell className="text-right">{footerTotal}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
