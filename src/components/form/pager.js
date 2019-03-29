import { Pagination } from "antd";
import React, { Component } from 'react'

class Pager extends Component {
    //   分页每页展示条数改变
    onShowSizeChange = (current, pageSize) => {
        this.props.onResetPageSize(pageSize);
    }
    // 第几页
    onPagerNumberChange = (pageNumber) => {
        this.props.onResetNewCurrent(pageNumber)
    }
    render() {

        const { pageSize, total } = this.props;
        if (!pageSize || !total) {
            return '';
        }
        return (
            <React.Fragment>
                <Pagination className="page center" showSizeChanger current={this.props.current} onShowSizeChange={this.onShowSizeChange} onChange={this.onPagerNumberChange} pageSize={pageSize} total={total} />
            </React.Fragment>
        )
    }
}

export default Pager
