import React, { Fragment } from "react";
import { Skeleton } from "antd"

export const PageSkeleton = () => {
  const skeletonElement = <Skeleton active paragraph={{ rows: 4 }} className="page-skeleton__paragraph" />

  return <Fragment>
    {skeletonElement}
    {skeletonElement}
    {skeletonElement}
  </Fragment>
}