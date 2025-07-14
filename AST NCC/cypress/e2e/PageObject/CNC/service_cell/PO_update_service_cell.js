class UpdateServiceCellPO{
clickServiceCellMenu(){
  return cy.get(':nth-child(5) > .tree-item > .MuiButtonBase-root').click();
}  
clickEditicon(){
  return cy.get('[data-testid="EditIcon"]').click();
}
txtLatitude(){
return cy.get('[data-testid="latitude"]')
}
txtLongitude(){
return cy.get('[data-testid="longitude"]')
}
txtAltitude(){
  return cy.get('[data-testid="altitude"]')
}
txtCellName(){
  return cy.get('[data-testid="cellName"]')
}
ele_dpdwn_beam_type(){
  return cy.get('[data-testid="beamType"]')
}
ele_dpdwn_provider(){
  return cy.get('[data-testid="provider"]')
}
ele_dpdwn_plmnId(){
  return cy.get('[data-testid="plmnId"]')
}
ele_dpdwn_frequency_group(){
  return cy.get('[data-testid="frequencyBandId"]')
}
ele_dpdwn_gateway(){
  return cy.get('[data-testid="gatewayIds"]')
}
txtCellPriority(){
  return cy.get('[data-testid="cellPriority"]')
}
txtRecieveMode(){
  return cy.get('[data-testid="receiveMode"]')
}
txtTransmitMode(){
  return cy.get('[data-testid="transmitMode"]')
}
clickToggleOverridebtn(){
  return cy.get('[data-testid="overrideGeoCenter"]')
}
clickbtnUpdate(){
  return cy.get('.MuiButton-black').click()
}
ele_dpddwn_value(){
  return cy.get('[role="listbox"]')
}
}
export default UpdateServiceCellPO