class UploadServiceCellPO{
clickProviderCard(){
    return cy.get(':nth-child(4) > .MuiListItemText-root > .MuiTypography-root').click()
}
clickNetworkPlanningCard(){
  return cy.get(':nth-child(3) > .tree-item > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click()
}
txtNetworkPlanning(){
  return cy.get('.css-1t62lt9 > .MuiTypography-root').contains('Network Planning')
}
ele_upload_csv(){
    return cy.get('[type="file"]');
}    
ele_dpdwn_type(){
    return cy.get('[data-testid="type"]').click()
}
ele_dpdwn_value(){
    return cy.get('[role="listbox"]')
}
ele_dpdwn_country(){
    return cy.get('[data-testid="country"]').click()
}
ele_dpdwn_gateway(){
    return cy.get('[data-testid="gatewayIds"]').click()
}
clickUploadBtn(){
    return cy.get('.css-17dbwaa > .MuiButton-contained').contains('Upload').click();
}
checkvaluetxt(){
    return cy.get('[role="table"]')
}
clickEyeButton() {
    return ('button.MuiButtonBase-root.MuiIconButton-root')
}
clickListview(){
    return cy.get('[value="table"]').contains('List View').click();
}
clickPublishtoGcbtn(){
    return cy.get('button').contains('Publish to GC').click();
}
clickGatewayMenu(){
    return cy.get('.MuiList-root > :nth-child(3)').click();
}
clickServiceCellMenu(){
    return cy.get('[href="/gateway/configurations/ems/service-cell"] > .MuiButtonBase-root').click()
}
}
export default UploadServiceCellPO