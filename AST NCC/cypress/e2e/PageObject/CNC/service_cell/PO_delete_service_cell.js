class DeleteServiceCellPO{
    clickProviderCard(){
        return cy.get(':nth-child(4) > .MuiListItemText-root > .MuiTypography-root').click()
    }
    clickServiceCellCard(){
        return cy.get(':nth-child(5) > .tree-item > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    }
    findtablename(){
        return cy.get('[role="table"]')
    }
    clickListview(){
        return cy.get('[value="table"]').contains('List View').click();
    }
    clickDeleteicon(){
        return cy.get('[data-testid="DeleteForeverIcon"]').click();
    }
    clickYesbtn(){
        return cy.get('button').contains("Yes, Delete").click();
    }
}
export default DeleteServiceCellPO