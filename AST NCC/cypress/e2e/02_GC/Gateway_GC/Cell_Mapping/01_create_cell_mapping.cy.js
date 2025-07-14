import CellMappingPO from "../../../PageObject/GC/cell_mapping/PO_cell_mapping";

describe("Cell Mapping", () => {

    const baseUrl2 = Cypress.config('baseUrl2');
    const loginUrl = `${baseUrl2}/login`;
    const cellMapping = new CellMappingPO()
    let cellmapping;
    let toast;

    before("Login a user", () => {
        cy.loginToGC();
    })

    beforeEach("Setting up the fixtures",()=>{
        cy.visit(loginUrl);
        cy.fixture("GC/Cell_Mapping/cell_mapping.json").then((data) => {
            cellmapping = data;
        })
        cy.fixture('toaster/toast_messages.json').then((data) => {
            toast = data;
        })
    })

    it("Create Cell Assignment", () => {
        cellMapping.clickGatewayMenubtn();
        cellMapping.clickCellMappingMenubtn();
        cellMapping.txtServiceCellSearch().type(cellmapping.CellMapping[0].gcMid.serviceCellId1);
        cellMapping.clickServiceCellId();

        //Check if the cell has mapping already, if exist release the cells then add the new assignment
        cy.get('.details-view-header').wait(3000).then($header => {
            if ($header.find('button:contains("Change Cell Assignment")').length > 0) {
                cy.wrap($header).contains('button', 'Change Cell Assignment').click();
                cellMapping.clickReleaseeNodeBbtn();
                cy.toastMessage(toast.ToastMessages.CellMapping[0].releaseassignedCells).wait(3000);
            }
            cellMapping.btnCreateCellAssignment();
            cellMapping.ele_dpdwn_eNodebCell1()
            cellMapping.ele_dpddwn_value().contains(cellmapping.CellMapping[0].cellpair3.enodeBcell1).click();
            cellMapping.ele_dpdwn_eNodebCell2()
            cellMapping.ele_dpddwn_value().contains(cellmapping.CellMapping[0].cellpair3.enodeBcell2).click();
            cellMapping.clickCreatebtn();
            cy.toastMessage(toast.ToastMessages.CellMapping[0].assignServiceCellMapping);

            //Verify the cell mapped is saved in the details page.
            cellMapping.txtValueeNodeB1().contains(cellmapping.CellMapping[0].cellpair3.enodeBcell1)
            cellMapping.txtValueeNodeB2().contains(cellmapping.CellMapping[0].cellpair3.enodeBcell2);
        });
    })
})
