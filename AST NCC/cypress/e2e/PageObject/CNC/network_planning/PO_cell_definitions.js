class CellDefintionPO{
    clickSchedulerCard(){
        return cy.get(':nth-child(6) > .MuiListItemText-root > .MuiTypography-root').click();
    }
    clickCellDefinitionCard(){
        return cy.get(':nth-child(3) > .tree-item > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    }
    findtablename(){
        return cy.get('[role="table"]')
    }
}
export default CellDefintionPO