import { Job, User } from "../../types";

export const getPreviousFourDayNames = (): string[] => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  const todayIndex = today.getDay();

  const result = [];

  for (let i = 0; i < 4; i++) {
    const dayIndex = (todayIndex - i + 7) % 7;
    result.push(daysOfWeek[dayIndex]);
  }

  return result;
};

export const getElapsedTime = (createdAt: Date): string => {
  const now = new Date();
  const elapsedTimeMs = now.getTime() - createdAt.getTime();

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const monthsInMs = daysInMs * 30.44; // Average month length

  if (elapsedTimeMs < minutesInMs) {
    const seconds = Math.floor(elapsedTimeMs / secondsInMs);
    return `${seconds} seconds ago`;
  } else if (elapsedTimeMs < hoursInMs) {
    const minutes = Math.floor(elapsedTimeMs / minutesInMs);
    return `${minutes} minutes ago`;
  } else if (elapsedTimeMs < daysInMs) {
    const hours = Math.floor(elapsedTimeMs / hoursInMs);
    return `${hours} hours ago`;
  } else if (elapsedTimeMs < monthsInMs) {
    const days = Math.floor(elapsedTimeMs / daysInMs);
    return `${days} days ago`;
  } else {
    const months = Math.floor(elapsedTimeMs / monthsInMs);
    return `${months} months ago`;
  }
};

export const countUsersBeforeEachMonth = (
  users: Array<User>
): Array<number> => {
  const counts = new Array(12).fill(0);

  const monthBoundaries: Array<Date> = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(i);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    monthBoundaries.push(date);
  }

  const userDates = users.map((user) => new Date(user.created_at));

  userDates.forEach((date) => {
    for (let i = 0; i < monthBoundaries.length; i++) {
      if (date < monthBoundaries[i]) {
        counts[i]++;
      }
    }
  });

  return counts;
};

export const categorizeTotalJobsByMonth = (jobs: Job[]): number[] => {
  const jobCounts: number[] = Array.from({ length: 12 }, () => 0);

  jobs.forEach((job) => {
    const jobDate = new Date(job.created_at);
    const month = jobDate.getMonth();

    jobCounts[month]++;
  });

  return jobCounts;
};

export const categorizeJobsDoneByMonth = (jobs: Job[]): number[] => {
  const completedJobCounts: number[] = Array.from({ length: 12 }, () => 0);

  jobs.forEach((job) => {
    const jobDate = new Date(job.created_at);
    const month = jobDate.getMonth();

    if (job.is_done) {
      completedJobCounts[month]++;
    }
  });

  return completedJobCounts;
};

export const getUserPercentageForInactiveUsers = (users: User[]): number[] => {
  const userInactiveCounts: number[] = Array.from({ length: 12 }, () => 0);
  const monthBoundaries: Date[] = [];
  const today = new Date();
  today.setDate(1);
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(i);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    monthBoundaries.push(date);
  }

  users.forEach((user) => {
    const lastOnlineDate = new Date(user.last_online);

    monthBoundaries.forEach((boundaryDate, index) => {
      const oneMonthBeforeBoundary = new Date(boundaryDate);
      oneMonthBeforeBoundary.setMonth(boundaryDate.getMonth() - 1);
      if (oneMonthBeforeBoundary >= today) {
        return;
      }

      if (lastOnlineDate < oneMonthBeforeBoundary) {
        userInactiveCounts[index]++;
      }
    });
  });

  return userInactiveCounts;
};

export const calculateAverageDuration = (
  jobs: Job[]
): { duration: number; unit: string } => {
  const doneJobs = jobs.filter((job) => job.is_done && job.done_at !== null);

  if (doneJobs.length === 0) {
    return { duration: 0, unit: "mins" };
  }

  const durationsInMinutes = doneJobs.map((job) => {
    if (job.done_at) {
      const durationMs =
        new Date(job.done_at).getTime() - new Date(job.created_at).getTime();
      return durationMs / (1000 * 60);
    }
  });

  const totalDuration = durationsInMinutes.reduce(
    (sum, duration) => (sum as number) + (duration as number),
    0
  );

  const averageDuration = totalDuration ?? 0 / doneJobs.length;

  if (averageDuration < 60) {
    return { duration: Math.round(averageDuration), unit: "mins" };
  } else if (averageDuration < 1440) {
    return { duration: Math.round(averageDuration / 60), unit: "hours" };
  } else if (averageDuration < 10080) {
    return { duration: Math.round(averageDuration / 1440), unit: "days" };
  } else if (averageDuration < 43200) {
    return { duration: Math.round(averageDuration / 10080), unit: "weeks" };
  } else {
    return { duration: Math.round(averageDuration / 43200), unit: "months" };
  }
};

export const isStringIncluded = (user: User, array2: string[]): boolean => {
  const array1 = [
    user.first_name.toLowerCase(),
    user.last_name.toLowerCase(),
    user.email.toLowerCase(),
  ];
  if (user.wilaya) {
    array1.push(user.wilaya.name_en.toLowerCase());
  }
  if (user.commune) {
    array1.push(user.commune.name_en.toLowerCase());
  }

  const found: Array<string> = [];

  for (const str1 of array1) {
    for (const str2 of array2) {
      if (str1.includes(str2)) {
        if (!found.includes(str2)) {
          found.push(str2);
        }
        break;
      }
    }
  }

  if (found.length === array2.length) {
    return true;
  }
  return false;
};
