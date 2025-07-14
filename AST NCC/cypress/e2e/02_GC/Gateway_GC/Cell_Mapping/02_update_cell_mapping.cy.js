import CellMappingPO from "../../../PageObject/GC/cell_mapping/PO_cell_mapping";

describe("Update a Service Cell", () => {
    const cellmapping = new CellMappingPO();
    let cellMapping;
    let toast;

    const baseUrl2 = Cypress.config('baseUrl2');
    const loginUrl = `${baseUrl2}/login`;

    before("Login a user", () => {
        cy.loginToGC();
    })
    beforeEach("Setting up the fixtures", () => {
        cy.visit(loginUrl);
        cy.fixture("GC/Cell_Mapping/cell_mapping.json").then((data) => {
            cellMapping = data;
        })
        cy.fixture('toaster/toast_messages.json').then((data) => {
            toast = data;
        })
    })

    it("Verify that user is able to update a mapped service cell and able to assign other eNodeB cells", () => {
        //Update the current cell mapping
        cellmapping.clickGatewayMenubtn()
        cellmapping.clickCellMappingMenubtn()
        cellmapping.txtServiceCellSearch().type(cellMapping.CellMapping[0].gcMid.serviceCellId1);
        cellmapping.clickServiceCellId()
        cy.get('.details-view-header').contains('button', 'Change Cell Assignment').click();
        cellmapping.clickReleaseeNodeBbtn();
        cy.toastMessage(toast.ToastMessages.CellMapping[0].releaseassignedCells).wait(3000);

        //Assign service cells to other eNodeB cells 
        cellmapping.btnCreateCellAssignment()
        cellmapping.ele_dpdwn_eNodebCell1()
        cellmapping.ele_dpddwn_value().contains(cellMapping.CellMapping[0].cellpair4.enodeBcell1).click();
        cellmapping.ele_dpdwn_eNodebCell2()
        cellmapping.ele_dpddwn_value().contains(cellMapping.CellMapping[0].cellpair4.enodeBcell2).click();
        cellmapping.clickCreatebtn();
        cy.toastMessage(toast.ToastMessages.CellMapping[0].assignServiceCellMapping);

        //Verify the cell mapped is saved in the details page.
        cellmapping.txtValueeNodeB1().contains(cellMapping.CellMapping[0].cellpair4.enodeBcell2)
        cellmapping.txtValueeNodeB2().contains(cellMapping.CellMapping[0].cellpair4.enodeBcell1);
    })
})