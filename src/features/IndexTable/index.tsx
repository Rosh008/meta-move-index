import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dummyTableData = [
  "ReMorph AI",
  "Apps",
  "35.02",
  "+33.70%",
  "299.58K",
  "+6.87%",
  "$9K",
  "1.68K",
  "$0.0₃3000 +6.87%",
  "NAN",
  "970.00",
];

export default function IndexTable() {
  const headerItems = [
    "Project",
    "Label",
    "Mindshare",
    "Δ",
    "Market Cap",
    "Δ",
    "24h Volume",
    "Followers",
    "Price",
    "Top Tweet",
    "Holders",
  ];

  return (
    <div className="bg-[#171717] w-full h-full p-4 flex items-stretch">
      <Table>
        <TableHeader>
          <TableRow>
            {headerItems.map((item) => (
              <TableHead key={item}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }, (_, index) => (
            <TableRow key={index}>
              {dummyTableData.map((item) => (
                <TableCell>{item}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
