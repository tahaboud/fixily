import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";
import { useTranslation } from "react-i18next";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Chart = ({
  xData,
  yData,
  title,
}: {
  title: string;
  xData: Array<number>;
  yData: Array<{
    data: Array<number>;
    area?: boolean;
    color: string;
    label?: string;
  }>;
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 2,
        cursor: "pointer",
        boxShadow: "0px 4px 8px 0px #00000017",
      }}
    >
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, width: "100%" }}>
        {t(title)}
      </Typography>
      {["user_growth", "user_retention"].includes(title) ? (
        <>
          <svg
            style={{ width: 0, height: 0, position: "absolute" }}
            aria-hidden="true"
            focusable="false"
          >
            <linearGradient id="my-cool-gradient" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(68, 126, 239, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
            </linearGradient>
          </svg>
          <div>
            <LineChart
              xAxis={[
                {
                  data: xData,
                  valueFormatter: (value) => months[value],
                },
              ]}
              series={yData}
              sx={{
                "& .MuiAreaElement-root": {
                  fill: "url(#my-cool-gradient)",
                },
              }}
              grid={{ horizontal: true }}
              width={1500}
              height={300}
              bottomAxis={null}
              leftAxis={{ tickMinStep: 10 }}
            />
          </div>
        </>
      ) : (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: xData,
              valueFormatter: (value) => months[value],
            },
          ]}
          series={yData}
          bottomAxis={null}
          width={1500}
          height={300}
          slotProps={{
            legend: { hidden: true },
          }}
          borderRadius={16}
          grid={{ horizontal: true }}
        />
      )}
    </Box>
  );
};

export default Chart;
