const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
require("dotenv").config();

MONGODB_URI = 'mongodb://127.0.0.1:27017/test';
let exerciseId;

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
// });

beforeEach(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
});

afterEach(async () => {
  await mongoose.connection.close();
});


describe("POST /exercises", () => {
  it("should create a new exercise", async () => {
    const res = await request(app).post("/exercises").send({
      name: "Test Exercise",
      type: "Powerlifting",
      muscle: "Chest",
      difficulty: "Beginner",
      instructions: "TEST INSTRUCTIONS FOR TEST EXERCISE"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.name).toBe("Test Exercise");
    exerciseId = res.body.data._id
  })

  it("should throw error", async () => {
    const res = await request(app).post("/exercises").send({
      name: "Test Exercise",
      muscle: "Chest",
      difficulty: "Beginner"
    });
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toEqual(false)
  })
})

describe("GET /exercises", () => {
  it("Should return exercises", async () => {
    const res = await request(app).get("/exercises");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true)
  });
})

describe("PUT /exercises/:id", () => {
  it("Should updatee the exercise", async () => {
    const res = await request(app).put(`/exercises/${exerciseId}`).send({
      name: "Test Exercise 2",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Test Exercise 2")
  })
})

describe("POST /exercises/workoutDone", () => {
  it("Should mark workout done", async () => {
    const res = await request(app).post("/exercises/workoutDone").send({
      sets: 5,
      reps: 5,
      weight: 5,
    })
    expect(res.statusCode).toBe(200);
    expect(res.body.data.workoutHistory.weight).toBe(5)
  });
})



describe("GET /exercises/:id/lift-history", () => {
  it("Should get lift history", async () => {
    const res = await request(app).get(`/exercises/${exerciseId}/lift-history`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true);
  });
  
  it("Should return error if wrong id is passed", async () => {
    const res = await request(app).get(`/exercises/123456/lift-history`);
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toEqual("Server error");
  });
});

describe("DELETE /exercises/:id", () => {
  it("Should delete exercise", async () => {
    const res = await request(app).delete(`/exercises/${exerciseId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toEqual(true)
  });
})
    
