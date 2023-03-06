import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  count: any;
}
// export const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "A"],
//   datasets: [
//     {
//       label: "읽은 수",
//       data: [12, 19, 8, 5, 3],
//       backgroundColor: ["#fde047", "#fef9c3", "#fef08a", "#fcd34d", "#e5e7eb"],
//       borderColor: ["#fbbf24", "#fde68a", "#fde047", "#fbbf24", "#d1d5db"],
//       borderWidth: 1,
//     },
//   ],
// };

export default function App({ count }: Props) {
  const [field, setField] = useState<any>([]);
  const [sum, setSum] = useState<any>([]);

  useEffect(() => {
    count.map((item: any) => {
      let parse = JSON.parse(item.field);
      let category = parse[0] + " > " + parse[1];

      /** 카테고리 목록 push */
      setField((field: any) => [...field, category]);

      /** 합계 리스트 push */
      setSum((s: any) => [...s, item._sum.fieldcount]);
      return;
    });
  }, []);

  /** chart에 들어가는 값 */
  const data = {
    labels: field,
    datasets: [
      {
        label: "읽은 수",
        data: sum,
        backgroundColor: [
          "#fde047",
          "#fef9c3",
          "#fef08a",
          "#e5e7eb",
          "#f3f4f6",
        ],
        borderColor: ["#fbbf24", "#fde68a", "#fde047", "#d1d5db", "#e5e7eb"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
