import React from "react";
import { Skeleton, Divider } from "antd";

interface Props {
  title: string
}

export const ListingsSkeleton = ({ title }: Props) => {
  return <div>
    <h1>
      {title}
    </h1>
    <Skeleton active paragraph={{ rows: 1 }} />
    <Divider />
    <Skeleton active paragraph={{ rows: 1 }} />
    <Divider />
    <Skeleton active paragraph={{ rows: 1 }} />
  </div>
}