import { Card, CardBody } from "@nextui-org/react";
import type { ReactNode } from "react";
import { motion } from "framer-motion"

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
    <motion.div whileHover={{ scale: 1.05 }}
      className="w-full">
      <Card className="h-full">
        <CardBody>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-medium text-gray-900">{statistic}</p>
              <p className="text-sm text-gray-500">{title}</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              {icon}
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
