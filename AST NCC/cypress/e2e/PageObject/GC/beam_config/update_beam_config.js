class UpdateBeamConfigPO{
    clickServiceCellMenubtn(){
       return cy.get('[href="/gateway/configurations/ems/service-cell"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    }
    clickListViewbtn(){
        return cy.get('[value="table"]').click();
    }
    getTableName(){
        return cy.get('[role="table"]')
    }
    clickSettingIcon(){
        cy.get('button').click();
    }
    txtCellPriority()
    {
        return cy.get('[data-testid="beamPriority"]')
    }
    ele_dpdwn_beamsize(){
        return cy.get('[data-testid="beamSize"]').click()
    }
    ele_dpdwn_beam_cell_bandwidth(){
        return cy.get('[data-testid="beamcellBandwidth"]').click()
    }
    txtBeamULFreq(){
        return cy.get('[data-testid="beamUplinkFrequency"]')
    }
    txtBeamDLFreq(){
        return cy.get('[data-testid="beamDownlinkFrequency"]')
    }
    txtBeamDLOutputPower(){
        return cy.get('[data-testid="beamDownlinkOutputPower"]')
    }
    toggleOverridebtn(){
        return cy.get('[data-testid="beamOverride"]')
    }
    ele_dpddwn_value(){
        return cy.get('[role="listbox"]')
    }
    clickUpdatebtn(){
        return cy.get('button').contains('Update').click()
    }
    clickBeamDescriptorMenubtn(){
        return cy.get('[href="/gateway/operations/bpms/beam-descriptor"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    }
}
export default UpdateBeamConfigPO
