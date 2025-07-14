class LoginPageObject{
    typetxtEmailId() {
        return cy.get('[data-testid="emailId"]', { timeout: 30000 })
    }
    typetxtPassword() {
        return cy.get('[data-testid="password"]', { timeout: 20000 })
    }
    clickButtonLogin() {
        return cy.get('[type="submit"]', { timeout: 20000 })
    }
    textUserDetails(){
        return cy.get('.MuiCardHeader-subheader')
    }
    textValidationMessageForEmailRequired(){
      return  cy.get(':nth-child(1) > .MuiFormHelperText-root')
    }
    textValidationMessageForPasswordRequired(){
        return cy.get(':nth-child(2) > .MuiFormHelperText-root')
    }
    textValidationMessgaeInvalidUser(){
        return cy.get('.MuiAlert-message')
    }
}
export default LoginPageObject