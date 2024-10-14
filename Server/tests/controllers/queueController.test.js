const { afterEach } = require("node:test");
const {
  getMetrics,
  getJobs,
  addJob,
  obliterateQueue,
} = require("../../controllers/queueController");
const SERVICE_NAME = "JobQueueController";

const { errorMessages, successMessages } = require("../../utils/messages");
const sinon = require("sinon");

describe("Queue Controller - getMetrics", () => {
  beforeEach(() => {
    req = {
      headers: {},
      params: {},
      body: {},
      db: {},
      jobQueue: {
        getMetrics: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    handleError = sinon.stub();
  });
  afterEach(() => {
    sinon.restore();
  });
  it("should throw an error if getMetrics throws an error", async () => {
    req.jobQueue.getMetrics.throws(new Error("getMetrics error"));
    await getMetrics(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("getMetrics error");
  });

  it("should return a success message and data if getMetrics is successful", async () => {
    const data = { data: "metrics" };
    req.jobQueue.getMetrics.returns(data);
    await getMetrics(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(res.json.firstCall.args[0]).to.deep.equal({
      success: true,
      msg: successMessages.QUEUE_GET_METRICS,
      data,
    });
  });
});

describe("Queue Controller - getJobs", () => {
  beforeEach(() => {
    req = {
      headers: {},
      params: {},
      body: {},
      db: {},
      jobQueue: {
        getJobStats: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    handleError = sinon.stub();
  });
  afterEach(() => {
    sinon.restore();
  });
  it("should reject with an error if getJobs throws an error", async () => {
    req.jobQueue.getJobStats.throws(new Error("getJobs error"));
    await getJobs(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("getJobs error");
  });
  it("should return a success message and data if getJobs is successful", async () => {
    const data = { data: "jobs" };
    req.jobQueue.getJobStats.returns(data);
    await getJobs(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(res.json.firstCall.args[0]).to.deep.equal({
      success: true,
      msg: successMessages.QUEUE_GET_METRICS,
      data,
    });
  });
});

describe("Queue Controller - addJob", () => {
  beforeEach(() => {
    req = {
      headers: {},
      params: {},
      body: {},
      db: {},
      jobQueue: {
        addJob: sinon.stub(),
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    handleError = sinon.stub();
  });
  afterEach(() => {
    sinon.restore();
  });
  it("should reject with an error if addJob throws an error", async () => {
    req.jobQueue.addJob.throws(new Error("addJob error"));
    await addJob(req, res, next);
    expect(next.firstCall.args[0]).to.be.an("error");
    expect(next.firstCall.args[0].message).to.equal("addJob error");
  });
  it("should return a success message if addJob is successful", async () => {
    req.jobQueue.addJob.resolves();
    await addJob(req, res, next);
    expect(res.status.firstCall.args[0]).to.equal(200);
    expect(res.json.firstCall.args[0]).to.deep.equal({
      success: true,
      msg: successMessages.QUEUE_ADD_JOB,
    });
  });
});
