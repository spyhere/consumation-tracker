import React from 'react'
import { Tooltip } from "antd"
import { WarningOutlined } from "@ant-design/icons"

type Props = {
  title: string
  isWarning: boolean
}

const CardWarningTitle = ({ title, isWarning }: Props) => (
  <>
    {title}
    {" "}
    {isWarning &&
      <Tooltip title="Calories day limit is reached">
        <WarningOutlined/>
      </Tooltip>
    }
  </>
)


export default CardWarningTitle