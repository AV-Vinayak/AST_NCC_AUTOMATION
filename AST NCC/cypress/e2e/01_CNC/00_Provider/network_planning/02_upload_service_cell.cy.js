import CellDefintionPO from "../../../PageObject/CNC/network_planning/PO_cell_definitions";
import UploadServiceCellPO from "../../../PageObject/CNC/network_planning/PO_upload_service_cell";
import CellMappingPO from "../../../PageObject/GC/cell_mapping/PO_cell_mapping";
import 'cypress-file-upload';

describe("Upload a Service Cell file", () => {

    const baseUrl1 = Cypress.config('baseUrl1');
    const loginUrl = `${baseUrl1}/login`;
    const uploadservicecell = new UploadServiceCellPO();
    const celldefinition = new CellDefintionPO();
    const cellMapping = new CellMappingPO();
    let servicecell;
    let toast;
    let cellmapping

    before("Login a user", () => {
        cy.loginToCNC();
    });

    beforeEach("Setting up the fixtures", () => {
        cy.visit(loginUrl);
        cy.fixture('CNC/provider/uploadservicecell.json').then((data) => {
            servicecell = data;
        })
        cy.fixture('toaster/toast_messages.json').then((data) => {
            toast = data;
        })
        cy.fixture("GC/Cell_Mapping/cell_mapping.json").then((data) => {
            cellmapping = data;
        })
    })

    it('Upload a Service Cell', () => {
        uploadservicecell.clickProviderCard();
        uploadservicecell.clickNetworkPlanningCard();
        uploadservicecell.txtNetworkPlanning();          //Verfiy the header of the page
        cy.fixture('CNC/network_planning_files/service_cells/Service_Request_Template_cy.csv').then(fileContent => {
            uploadservicecell.ele_upload_csv()
                .attachFile({
                    fileContent,
                    fileName: 'Service_Request_Template_cy.csv',
                    mimeType: 'text/csv',
                });
            uploadservicecell.ele_dpdwn_type();
            uploadservicecell.ele_dpdwn_value().contains(servicecell.uploadfiles[0].type.servicecell).click();
            uploadservicecell.ele_dpdwn_country();
            uploadservicecell.ele_dpdwn_value().contains(servicecell.uploadfiles[0].country.usa).click();
            uploadservicecell.ele_dpdwn_gateway();
            uploadservicecell.ele_dpdwn_value().contains(servicecell.uploadfiles[0].gateway.midland).click();
            uploadservicecell.clickUploadBtn();
            cy.toastMessage(toast.ToastMessages.UploadServiceCell[0].uploadServiceCell);
            uploadservicecell.clickPublishtoGcbtn();
        })

        //Verify that file is listed in the table
        uploadservicecell.checkvaluetxt().contains('td', 'Service_Request_Template_cy.csv').parents('tr').find(uploadservicecell.clickEyeButton()).click().wait(3000);
        uploadservicecell.clickListview().wait(3000);
        uploadservicecell.checkvaluetxt().contains('td', '1840178', '18404090', '18401010', '18405647', '1840116')

        //Verify that service cells are updated in the cell defintion page in CNC
        celldefinition.clickSchedulerCard();
        celldefinition.clickCellDefinitionCard();
        celldefinition.findtablename().contains('td', '1840178');
    })

    it('Verify that user is able to cell map the service cells that is manually uploaded', () => {
        //Verify the uploaded service cells are synced to the respective GC
        cy.userlogout();
        cy.loginToGC();
        uploadservicecell.clickGatewayMenu();
        uploadservicecell.clickServiceCellMenu();
        uploadservicecell.clickListview();
        uploadservicecell.checkvaluetxt().contains('td', '1840178');

        //Verify the Cell Mapping page is listing the service cells
        cellMapping.clickGatewayMenubtn();
        cellMapping.clickCellMappingMenubtn();
        cellMapping.txtServiceCellSearch().type(cellmapping.CellMapping[0].gcMid.serviceCellId1);
        cellMapping.txtServiceCellSearch().clearThenType(cellmapping.CellMapping[0].gcMid.serviceCellId4);
        cellMapping.txtServiceCellSearch().clearThenType(cellmapping.CellMapping[0].gcMid.serviceCellId5);
        cellMapping.txtServiceCellSearch().clearThenType(cellmapping.CellMapping[0].gcMid.serviceCellId7);
        cellMapping.txtServiceCellSearch().clearThenType(cellmapping.CellMapping[0].gcMid.serviceCellId8);

        //Check if the cell has mapping already, if exist release the cells then add the new assignment
        cellMapping.txtServiceCellSearch().clearThenType(cellmapping.CellMapping[0].gcMid.serviceCellId4);
        cellMapping.clickServiceCellId();
        cy.get('.details-view-header').wait(3000).then($header => {
            if ($header.find('button:contains("Change Cell Assignment")').length > 0) {
                cy.wrap($header).contains('button', 'Change Cell Assignment').click();
                cellMapping.clickReleaseeNodeBbtn();
                cy.toastMessage(toast.ToastMessages.CellMapping[0].releaseassignedCells).wait(3000);
            }
            cellMapping.btnCreateCellAssignment()
            cellMapping.ele_dpdwn_eNodebCell1()
            cellMapping.ele_dpddwn_value().contains(cellmapping.CellMapping[0].cellpair1.enodeBcell1).click();
            cellMapping.ele_dpdwn_eNodebCell2()
            cellMapping.ele_dpddwn_value().contains(cellmapping.CellMapping[0].cellpair1.enodeBcell2).click();
            cellMapping.clickCreatebtn();
            cy.toastMessage(toast.ToastMessages.CellMapping[0].assignServiceCellMapping);
        })
    })
})