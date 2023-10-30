import {
  Diagnosis,
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  NewPatient,
  OccupationalHealthcareEntry,
} from "../types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "ssn" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      ssn: parseSSN(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect name: " + name);
  }

  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect SSN: " + ssn);
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation: " + occupation);
  }

  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }

  return gender;
};

const isGender = (str: string): str is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(str);
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "date" in object &&
    "description" in object &&
    "specialist" in object
  ) {
    const entryObject = object as EntryWithoutId;
    switch (entryObject.type) {
      case "Hospital":
        if ("discharge" in entryObject) {
          const newHospitalEntry: EntryWithoutId = {
            description: parseDescription(entryObject.description),
            date: parseDate(entryObject.date),
            specialist: parseSpecialist(entryObject.specialist),
            diagnosisCodes: parseDiagnosisCodes(entryObject.diagnosisCodes),
            type: "Hospital",
            discharge: parseDischarge(entryObject.discharge),
          };

          return newHospitalEntry;
        }
        throw new Error("Incorrect data: some fields are missing");
      case "HealthCheck":
        if ("healthCheckRating" in entryObject) {
          const newHealthCheckEntry: EntryWithoutId = {
            description: parseDescription(entryObject.description),
            date: parseDate(entryObject.date),
            specialist: parseSpecialist(entryObject.specialist),
            diagnosisCodes: parseDiagnosisCodes(entryObject.diagnosisCodes),
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(
              entryObject.healthCheckRating
            ),
          };
          return newHealthCheckEntry;
        }
        throw new Error("Incorrect data: some fields are missing");
      case "OccupationalHealthcare":
        if ("employerName" in entryObject) {
          const newOccupationalEntry: EntryWithoutId = {
            description: parseDescription(entryObject.description),
            date: parseDate(entryObject.date),
            specialist: parseSpecialist(entryObject.specialist),
            diagnosisCodes: parseDiagnosisCodes(entryObject.diagnosisCodes),
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(entryObject.employerName),
            sickLeave: parseSickLeave(entryObject.sickLeave),
          };
          return newOccupationalEntry;
        }
        throw new Error("Incorrect data: some fields are missing");
      default:
        return assertNever(entryObject);
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect description: " + description);
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect specialist: " + specialist);
  }

  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect employer name: " + employerName);
  }

  return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (typeof value !== "number" || !isHealthCheckRating(value)) {
    throw new Error("Incorrect health check rating: " + value);
  }

  return value;
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value);
};

const parseSickLeave = (
  object: unknown
): OccupationalHealthcareEntry["sickLeave"] => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object)
  ) {
    return undefined;
  }

  const sickLeave: OccupationalHealthcareEntry["sickLeave"] = {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };

  return sickLeave;
};

const parseDischarge = (object: unknown): HospitalEntry["discharge"] => {
  if (
    !object ||
    typeof object !== "object" ||
    !("date" in object) ||
    !("criteria" in object)
  ) {
    throw new Error("Invalid discharge: " + JSON.stringify(object));
  }

  const discharge: HospitalEntry["discharge"] = {
    date: parseDate(object.date),
    criteria: parseCriteria(object.criteria),
  };

  return discharge;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error("Incorrect criteria: " + criteria);
  }

  return criteria;
};
