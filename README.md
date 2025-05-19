# Payload CMS — Local Docker Environment

This repository provides a Docker-based setup for running Payload CMS locally. It’s designed to help you get up and running quickly for development and testing purposes, with a consistent and easy-to-use environment powered by Node.js and PostgreSQL.

## Getting Started
To get the CMS running locally, use the `terminal` and follow the steps below.

## Quick Start
```
git clone https://github.com/rocevas/payload-docker.git
cd payload-docker
make setup
```
This command will build the necessary Docker containers and initialize the environment.

## Building for Production

Once you have the development environment up and running, you can generate a fully static export of your site:

```
make build
```

After the build completes, you’ll find your entire site ready for upload in the ```out/``` directory at the project root.

## Branch management

We follow the MailerFlow branching model — a streamlined version of Git Flow without release branches.
For more details, please refer to our internal [MailerLite PR rules and flow](https://www.notion.so/mailergroup/MailerLite-PR-rules-and-flow-cce53c8222b14826b589243be185aae5).
