# AST_NCC_AUTOMATION

# Cypress E2E Testing Project (Page Object Model)

This project uses [Cypress](https://www.cypress.io/) for end-to-end testing with the **Page Object Model (POM)** design pattern, which helps organize tests by separating page actions and selectors into dedicated files.

## Project Structure

├── e2e/
│ └── test.cy.js/ # Test specs organized by feature/module
├── PageObject/ # Page Object files
│ └── PO_cell_definitions.js # Example Page Object file
├── fixtures/ # Static test data (JSON)
├── support/
│ ├── commands.js # Custom Cypress commands
│ └── e2e.js # Test setup code
cypress.config.js # Cypress config file
package.json # Project dependencies and scripts

## Installation
git clone https://github.com/AV-Vinayak/AST_NCC_AUTOMATION.git

## Initialize your project (if not already done).
If you don’t already have a package.json file, initialize a new Node.js project:

- npm init

**Install Cypress**
Using npm: - npm install cypress --save-dev

**Open Cypress for the first time:-**

- npx cypress open

Use the following command to run your tests in headless mode and generate reports:

- npx cypress run

