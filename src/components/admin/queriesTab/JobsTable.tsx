import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Job } from "../../../types";
import { getElapsedTime } from "../utils";

type JobType = "open_jobs" | "matched_jobs" | "archived_jobs" | "all";

const JobsTable = ({ jobs }: { jobs: Array<Job> | null }) => {
  const { t } = useTranslation();

  const [selectedJobType, setSelectedJobType] = useState<JobType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openJobs, setOpenJobs] = useState<Array<Job>>([]);
  const [archivedJobs, setArchivedJobs] = useState<Array<Job>>([]);
  const [matchedJobs, setMatchedJobs] = useState<Array<Job>>([]);
  const [allJobs, setAllJobs] = useState<Array<Job>>([]);
  const [queriedJobs, setQueriedJobs] = useState<Array<Job>>([]);

  useEffect(() => {
    if (jobs) {
      setSearchQuery("");
      setOpenJobs(jobs.filter((job) => job.artisan === null && !job.is_done));
      setMatchedJobs(
        jobs.filter((job) => job.artisan !== null && !job.is_done)
      );
      setArchivedJobs(jobs.filter((job) => job.is_done));
      setAllJobs(jobs);
      if (selectedJobType === "all") {
        setQueriedJobs(jobs);
      } else if (selectedJobType === "open_jobs") {
        setQueriedJobs(
          jobs.filter((job) => job.artisan === null && !job.is_done)
        );
      } else if (selectedJobType === "matched_jobs") {
        setQueriedJobs(
          jobs.filter((job) => job.artisan !== null && !job.is_done)
        );
      } else if (selectedJobType === "archived_jobs") {
        setQueriedJobs(jobs.filter((job) => job.is_done));
      }
    }
  }, [jobs]);

  useEffect(() => {
    setSearchQuery("");
    if (selectedJobType === "all") {
      setQueriedJobs(allJobs);
    } else if (selectedJobType === "open_jobs") {
      setQueriedJobs(openJobs);
    } else if (selectedJobType === "matched_jobs") {
      setQueriedJobs(matchedJobs);
    } else if (selectedJobType === "archived_jobs") {
      setQueriedJobs(archivedJobs);
    }
  }, [selectedJobType]);

  useEffect(() => {
    if (searchQuery === "") {
      if (selectedJobType === "all") {
        setQueriedJobs(allJobs);
      } else if (selectedJobType === "open_jobs") {
        setQueriedJobs(openJobs);
      } else if (selectedJobType === "matched_jobs") {
        setQueriedJobs(matchedJobs);
      } else if (selectedJobType === "archived_jobs") {
        setQueriedJobs(archivedJobs);
      }
    } else {
      if (selectedJobType === "all") {
        setQueriedJobs(
          allJobs.filter((job) =>
            job.sub_category.name_en.includes(searchQuery)
          )
        );
      } else if (selectedJobType === "open_jobs") {
        setQueriedJobs(
          openJobs.filter((job) =>
            job.sub_category.name_en.includes(searchQuery)
          )
        );
      } else if (selectedJobType === "matched_jobs") {
        setQueriedJobs(
          matchedJobs.filter((job) =>
            job.sub_category.name_en.includes(searchQuery)
          )
        );
      } else if (selectedJobType === "archived_jobs") {
        setQueriedJobs(
          archivedJobs.filter((job) =>
            job.sub_category.name_en.includes(searchQuery)
          )
        );
      }
    }
  }, [searchQuery]);

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        boxShadow: "0px 4px 8px 0px #00000017",
        flex: 3,
        height: "calc(80% - 4em)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1em",
          gap: "1em",
          height: "5em",
        }}
      >
        <Select
          displayEmpty
          value={selectedJobType}
          onChange={(e) => {
            setSelectedJobType(e.target.value as JobType);
          }}
          sx={{
            width: "10em",
            borderRadius: "24px",
            fontSize: "1rem",
            fontWeight: 700,
            backgroundColor: "#ECF0F180",
            textAlign: "center",
          }}
          size="small"
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value={"all"}>{t("all")}</MenuItem>
          <MenuItem value={"open_jobs"}>{t("open_jobs")}</MenuItem>
          <MenuItem value={"matched_jobs"}>{t("matched_jobs")}</MenuItem>
          <MenuItem value={"archived_jobs"}>{t("archived_jobs")}</MenuItem>
        </Select>
        <TextField
          InputProps={{
            startAdornment: <SearchIcon />,
            sx: { borderRadius: "24px" },
          }}
          size="small"
          sx={{ backgroundColor: "#ECF0F180", borderRadius: "24px", flex: 1 }}
          placeholder={t("search...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <TableContainer
        sx={{ minWidth: "50em", maxHeight: "calc(100% - 5em)" }}
        className="scrollbar"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                {t("id")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                {t("sub_category")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                {t("duration")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                {t("points")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                {t("wilaya")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                {t("commune")}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                {t("client_email")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queriedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                  {job.id}
                </TableCell>
                <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                  {job.sub_category.name_ar}
                </TableCell>
                <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                  {getElapsedTime(new Date(job.created_at))}
                </TableCell>
                <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                  {job.sub_category.point_cost}
                </TableCell>
                <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                  {job.wilaya.name_en}
                </TableCell>
                <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                  {job.commune.name_en}
                </TableCell>
                <TableCell align="center" sx={{ color: "#2C3E5080" }}>
                  {job.client.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JobsTable;
