import React from 'react';

const Pagination = props => (
    <div>
        <button disabled = {props.pageNo === 0} onClick = {() => props.onPageChange(-1)}> Previous </button>
        <span> Page {props.pageNo + 1} of {props.totalPages}</span>
        <button disabled = {props.pageNo === props.totalPages - 1} onClick = {() => props.onPageChange(1)}> Next </ button>
    </div>
);
export default Pagination;