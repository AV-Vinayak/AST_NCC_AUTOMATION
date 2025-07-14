import CreateServiceCellPO from "../../../PageObject/CNC/service_cell/PO_create_service_cell";
import UploadServiceCellPO from "../../../PageObject/CNC/network_planning/PO_upload_service_cell";
import CellDefintionPO from "../../../PageObject/CNC/network_planning/PO_cell_definitions";
import CellMappingPO from "../../../PageObject/GC/cell_mapping/PO_cell_mapping";


describe('Create a Service Cell', () => {

    const baseUrl1 = Cypress.config('baseUrl1');
    const loginUrl = `${baseUrl1}/login`;
    const provider = new UploadServiceCellPO()
    const createServiceCell = new CreateServiceCellPO()
    const celldefinition = new CellDefintionPO()
    const cellMapping = new CellMappingPO()

    let servicecell;
    let toast;
    let cellmapping;

    before("Login a user", () => {
        cy.loginToCNC();
    })
    beforeEach("Setting up the fixtures", () => {
        cy.visit(loginUrl);
        cy.fixture('CNC/provider/createservicecell.json').then((data) => {
            servicecell = data;
        })
        cy.fixture('toaster/toast_messages.json').then((data) => {
            toast = data;
        })
        cy.fixture("GC/Cell_Mapping/cell_mapping.json").then((data) => {
            cellmapping = data;
        })
    })

    it('Create a new service cell', () => {
        provider.clickProviderCard();
        createServiceCell.clickServiceCellCard();
        createServiceCell.clickCreateServiceCellBtn();
        createServiceCell.txtlatitude().type(servicecell.createServiceCell[0].USA_1.latitude);
        createServiceCell.txtlongitude().type(servicecell.createServiceCell[0].USA_1.longitude);
        createServiceCell.clickFindCellBtn();
        createServiceCell.txtaltitude().wait(1000).type(servicecell.createServiceCell[0].USA_1.altitude);
        createServiceCell.txtcellname().type(servicecell.createServiceCell[0].USA_1.cell_name);
        createServiceCell.ele_dpdwn_beam_type();
        createServiceCell.ele_dpddwn_value().contains(servicecell.createServiceCell[0].USA_1.beam_type).click();
        createServiceCell.ele_dpdwn_provider();
        createServiceCell.ele_dpddwn_value().contains(servicecell.createServiceCell[0].USA_1.provider).click();
        createServiceCell.ele_dpdwn_plmnId();
        createServiceCell.ele_dpddwn_value().contains(servicecell.createServiceCell[0].USA_1.plmnId).click();
        createServiceCell.ele_dpdwn_frequency_group();
        createServiceCell.ele_dpddwn_value().contains(servicecell.createServiceCell[0].USA_1.frequency_group).click();
        createServiceCell.ele_dpdwn_gateway();
        createServiceCell.ele_dpddwn_value().contains(servicecell.createServiceCell[0].USA_1.gateway).click();
        createServiceCell.txtcellpriority().clearThenType(servicecell.createServiceCell[0].USA_1.cell_priority);
        createServiceCell.txtrecievemode().clearThenType(servicecell.createServiceCell[0].USA_1.receieve_mode);
        createServiceCell.txttransmitmode().clearThenType(servicecell.createServiceCell[0].USA_1.transmit_mode);
        createServiceCell.toggle_override().then(($toggle) => {
            if (!$toggle.is(':checked')) {
                cy.wrap($toggle).click();
            }
        })
        createServiceCell.clickCreatebtn();
        cy.toastMessage(toast.ToastMessages.CreateServiceCell[0].createServiceCell)

    })

    it('Verify the newly created service is visible in the scheduler input section the Cell Definitions page', () => {
        celldefinition.clickSchedulerCard()
        celldefinition.clickCellDefinitionCard()
        celldefinition.findtablename().contains('184026')
    })


    it('Verify user is able to assign the cell mapping for the manually created service cell', () => {
        //Assigning the eNodeB cells to the Service cell that is created.
        cy.userlogout();
        cy.loginToGC();
        cellMapping.clickGatewayMenubtn();
        cellMapping.clickCellMappingMenubtn();
        cellMapping.txtServiceCellSearch().type('184026');
        cellMapping.clickServiceCellId();

        //Check if the cell has mapping already, if exist release the cells then add the new assignment
        cy.get('.details-view-header').wait(3000).then($header => {
            if ($header.find('button:contains("Change Cell Assignment")').length > 0) {
                cy.wrap($header).contains('button', 'Change Cell Assignment').click();
                cellMapping.clickReleaseeNodeBbtn();
                cy.toastMessage(toast.ToastMessages.CellMapping[0].releaseassignedCells).wait(3000);
            }
            cellMapping.btnCreateCellAssignment()
            cellMapping.ele_dpdwn_eNodebCell1()
            cellMapping.ele_dpddwn_value().contains(cellmapping.CellMapping[0].cellpair2.enodeBcell1).click();
            cellMapping.ele_dpdwn_eNodebCell2()
            cellMapping.ele_dpddwn_value().contains(cellmapping.CellMapping[0].cellpair2.enodeBcell2).click();
            cellMapping.clickCreatebtn();
            cy.toastMessage(toast.ToastMessages.CellMapping[0].assignServiceCellMapping);
        })
    })
})