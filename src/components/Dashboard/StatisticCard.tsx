import { Card, CardBody } from "@nextui-org/react";
import type { ReactNode } from "react";

export const StatisticCard = ({
  icon,
  title,
  statistic,
}: {
  icon: ReactNode;
  title: string;
  statistic: string;
}) => {
  return (
    <div className="w-full">
      <Card>
        <CardBody>
          <div className="flex items-center space-x-2">
            {icon}
            <p className="text-xs font-semibold text-gray-700">{title}</p>
          </div>
          <div className="mr-8 mt-4 self-end">
            <p className="text-3xl font-bold">{statistic}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
