import mongoose from "mongoose";

const hospitalRecordSchema = new mongoose.Schema({
  docterId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Docter" }],
  patientId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  hospitalId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
});

export const HospitalRecord = mongoose.model(
  "HospitalRecord",
  hospitalRecordSchema
);
