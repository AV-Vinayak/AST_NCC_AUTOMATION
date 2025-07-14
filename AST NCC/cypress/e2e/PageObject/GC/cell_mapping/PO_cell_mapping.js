class CellMappingPO {
    clickGatewayMenubtn() {
        return cy.get(':nth-child(3) > .MuiListItemText-root > .MuiTypography-root').click()
    }
    clickCellMappingMenubtn() {
        return cy.get('[href="/gateway/configurations/ems/cell-mapping"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click()
    }
    txtServiceCellSearch() {
        return cy.get('.MuiInputBase-input')
    }
    clickServiceCellId() {
        return cy.get('.MuiListItem-root > .MuiButtonBase-root').click()
    }
    btnCreateCellAssignment() {
        return cy.get('.empty-view > .MuiButtonBase-root').click()
    }
    ele_dpdwn_eNodebCell1() {
        return cy.get('[data-testid="enodebCellId[0].enodebCellId"]').click()
    }
    ele_dpddwn_value() {
        return cy.get('[role="listbox"]')
    }
    ele_dpdwn_eNodebCell2() {
        return cy.get('[data-testid="enodebCellId[1].enodebCellId"]').click()
    }
    clickCreatebtn() {
        return cy.get('button').contains('Create Cell Assignment').click()
    }
    clickReleaseeNodeBbtn() {
        return cy.get('button').contains('Release eNodeb Cells')
    }
    txtValueeNodeB1() {
        return cy.get(':nth-child(1) > .MuiGrid-spacing-xs-1 > :nth-child(1) > :nth-child(1) > .css-hmkje5 > .MuiTypography-subtitle1')
    }
    txtValueeNodeB2() {
        return cy.get(':nth-child(2) > .MuiGrid-spacing-xs-1 > :nth-child(1) > :nth-child(1) > .css-hmkje5 > .MuiTypography-subtitle1')
    }
    clickCloseicon() {
        return cy.get('[data-testid="CloseIcon"]').click()
    }
    txtChangeCellAssignment(){
        return cy.get('.details-view-header')
    }
    clickReleaseeNodeBbtn(){
        return cy.get('button').contains("Release eNodeb Cells").click()
    }
}
export default CellMappingPO