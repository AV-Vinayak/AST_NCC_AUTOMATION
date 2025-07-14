class UploadGeoCellPO{
clickServiceCellMenubtn(){
return cy.get('[href="/gateway/configurations/ems/geo-cell"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
}
findtablename(){
    return cy.get('[role="table"]')
}
clickListview(){
    return cy.get('[value="table"]').contains('List View').click();
}
}
export default UploadGeoCellPO