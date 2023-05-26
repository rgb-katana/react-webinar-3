import {usePagination, DOTS} from './use-pagination';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {codeGenerator} from '../../utils';

const numberGenerator = codeGenerator(0);

const Pagination = (props) => {
  const cn = bem('pagination');

  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className={cn('container')}>
      {paginationRange.map((pageNumber) => {
        const key = numberGenerator();
        if (pageNumber === DOTS) {
          return (
            <li key={key} className={cn('item dots')}>
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={key}
            className={`pagination-item ${
              currentPage === pageNumber ? 'selected' : ''
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
