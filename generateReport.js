const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',  // or you can specify your custom template
  jsonFile: 'reports/results.json',
  output: 'reports/report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  // Uncomment below and set custom template if using a custom one
  template: './custom-template/index.html',
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Local",
    "Browser": "Chrome",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);
