## Objectives



- Build a Detection-as-Code workflow where Sigma rules are version-controlled, validated, and compiled into Splunk queries through GitHub Actions.

- Route Splunk alerts into an automated triage workflow built in Tines.

- Use an AI agent to produce a structured triage report for each alert.

- Create Jira incident tickets automatically, with a human analyst approving containment before any response action runs.



## Technologies



Splunk Enterprise, Sysmon, Sigma, sigma-cli, GitHub Actions, Tines, Jira, and an LLM-based triage agent.



## Architecture



The workflow runs in five stages:



1. **Telemetry ingestion:** A Windows 10 VM logs process activity with Sysmon and forwards it to Splunk Enterprise.

2. **Alert trigger:** Splunk detects suspicious activity, such as `whoami.exe` execution or local account discovery, and sends the alert to a Tines webhook.

3. **Automated incident creation:** Tines parses the alert, an AI agent produces a triage report, and the result is created as a Jira issue through Jira's REST API.

4. **Analyst approval:** A SOC analyst reviews the ticket. To request containment, the analyst adds the `auto-isolate` label.

5. **Simulated containment:** Jira notifies Tines, which validates the request and sends a simulated host-isolation request. Tines then posts an audit comment back to the Jira ticket.

![Tines story canvas showing the alert triage and containment workflow](/images/tines-story-canvas.png)

*The Tines story: Splunk alerts enter through a webhook, an AI agent drafts the triage report, Jira tickets are created, and an analyst-applied label gates the simulated containment step.*


## Implementation



The lab environment is built in VirtualBox with a Windows 10 endpoint and an Ubuntu Server running Splunk Enterprise. 

Detection rules are written in Sigma and stored in a private repository. A GitHub Actions workflow validates each rule with sigma-cli and compiles it into Splunk search queries. I then turn those queries into real-time Splunk alerts that call the Tines webhook.



The Tines story filters incoming alerts by rule name and sends them to an AI agent with a structured analysis prompt (temperature set to 0.1). Each result becomes a Jira ticket containing the AI triage report and the raw telemetry. A second webhook listens for the `auto-isolate` label, which gates the simulated containment step.



**Scope note:** The containment step simulates an EDR API call and does not isolate a real host.



## Lessons learned



The hardest part of this project was getting the automation to work end to end, from a Splunk alert through Tines to a Jira ticket and back.

