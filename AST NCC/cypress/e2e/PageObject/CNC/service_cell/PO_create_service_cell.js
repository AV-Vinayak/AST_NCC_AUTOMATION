class CreateServiceCellPO{
clickServiceCellCard(){
    return cy.get(':nth-child(5) > .tree-item > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
}
clickCreateServiceCellBtn(){
    return cy.get('.MuiButton-root').contains('Create Service Cell').click();
}
txtlatitude(){
    return cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > [data-testid="latitude"]');
}
txtlongitude(){
    return cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > [data-testid="longitude"]');
}
clickFindCellBtn(){
    return cy.get('button').contains('Find Cell').click();
}
txtaltitude(){
    return cy.get('[data-testid="altitude"]');
}
txtcellname(){
    return cy.get('[data-testid="cellName"]');
}
ele_dpdwn_beam_type(){
    return cy.get('[data-testid="beamType"]').click();
}
ele_dpddwn_value(){
    return cy.get('[role="listbox"]')
}
ele_dpdwn_provider(){
    return cy.get('[data-testid="provider"]').click();
}
ele_dpdwn_plmnId(){
    return cy.get('[data-testid="plmnId"]').click();
}
ele_dpdwn_frequency_group(){
    return cy.get('[data-testid="frequencyBandId"]').click();
}
ele_dpdwn_gateway(){
    return cy.get('[data-testid="gatewayIds"]').click();
}
txtcellpriority(){
    return cy.get('[data-testid="cellPriority"]');
}
txtrecievemode(){
    return cy.get('[data-testid="receiveMode"]');
}
txttransmitmode(){
    return cy.get('[data-testid="transmitMode"]');
}
toggle_override(){
    return cy.get('[data-testid="overrideGeoCenter"]')
}
clickCreatebtn(){
    return cy.get('button').contains('Create').click();
}
}
export default CreateServiceCellPO