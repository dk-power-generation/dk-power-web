// import React from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   flexRender,
// } from '@tanstack/react-table';
// import './Table.css';

// function Table({ columns, data, onRowClick }) {
//   const [sorting, setSorting] = React.useState([]);

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//     },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     columnResizeMode: 'onChange',
//   });

//   return (
//     <div className="table-wrapper">
//       <table className="dark-theme-table responsive-table" style={{ width: table.getCenterTotalSize() }}>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th 
//                   key={header.id} 
//                   style={{ width: header.getSize() }}
//                   className="resizable-th"
//                   data-label={header.column.columnDef.header}
//                 >
//                   <div 
//                     className="th-content"
//                     onClick={header.column.getToggleSortingHandler()}
//                   >
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                     {{
//                       asc: ' 🔼',
//                       desc: ' 🔽',
//                     }[header.column.getIsSorted()] ?? null}
//                   </div>
//                   {header.column.getCanResize() && (
//                     <div
//                       onMouseDown={header.getResizeHandler()}
//                       onTouchStart={header.getResizeHandler()}
//                       className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
//                     />
//                   )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id} onClick={() => onRowClick(row.original)}>
//               {row.getVisibleCells().map(cell => (
//                 <td 
//                   key={cell.id} 
//                   style={{ width: cell.column.getSize() }}
//                   data-label={cell.column.columnDef.header}
//                 >
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import './Table.css';

function Table({ columns, data, onRowClick }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <div className="table-wrapper">
      <table className="dark-theme-table responsive-table" style={{ width: table.getCenterTotalSize() }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  style={{ width: header.getSize() }}
                  className="resizable-th"
                  data-label={header.column.columnDef.header}
                >
                  <div className="th-content">
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div>
                        <input
                          value={(header.column.getFilterValue() ?? '')}
                          onChange={e => header.column.setFilterValue(e.target.value)}
                          placeholder={`Search ${typeof header.column.columnDef.header === 'function' ? header.column.columnDef.header() : header.column.columnDef.header}`}
                          className="column-filter"
                        />
                      </div>
                    ) : null}
                  </div>
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => onRowClick(row.original)}>
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  style={{ width: cell.column.getSize() }}
                  data-label={cell.column.columnDef.header}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;