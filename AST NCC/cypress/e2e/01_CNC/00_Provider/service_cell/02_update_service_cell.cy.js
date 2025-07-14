import UploadServiceCellPO from "../../../PageObject/CNC/network_planning/PO_upload_service_cell";
import UpdateServiceCellPO from "../../../PageObject/CNC/service_cell/PO_update_service_cell";
import CellMappingPO from "../../../PageObject/GC/cell_mapping/PO_cell_mapping";

describe("Update Service Cell", () => {

    const baseUrl1 = Cypress.config('baseUrl1');
    const loginUrl = `${baseUrl1}/login`;
    const provider = new UploadServiceCellPO()
    const editservicecell = new UpdateServiceCellPO()
    const cellMapping = new CellMappingPO()
    let updateservicecell;
    let toast;
    let cellmapping;

    before("Login a user", () => {
        cy.loginToCNC();
    });

    beforeEach("Setting up the fixtures",()=>{
        cy.visit(loginUrl);
        cy.fixture('CNC/provider/updateservicecell.json').then((data) => {
            updateservicecell = data;
        })
        cy.fixture('toaster/toast_messages.json').then((data) => {
            toast = data;
        })
        cy.fixture("GC/Cell_Mapping/cell_mapping.json").then((data) => {
            cellmapping = data;
        })
    })
    it('Update a existing service cell', () => {
        provider.clickProviderCard();
        editservicecell.clickServiceCellMenu();
        provider.clickListview();
        provider.checkvaluetxt().contains('td', '184026').parent().within(() => {
            editservicecell.clickEditicon();
        });
        editservicecell.txtLatitude().wait(3000).clearThenType(updateservicecell.UpdateServiceCell[0].newlatitude);
        editservicecell.txtLongitude().clearThenType(updateservicecell.UpdateServiceCell[0].newlongitude);
        editservicecell.txtAltitude().clearThenType(updateservicecell.UpdateServiceCell[0].newaltitude);
        editservicecell.ele_dpdwn_beam_type().click();
        editservicecell.ele_dpddwn_value().contains(updateservicecell.UpdateServiceCell[0].newbeamtype).click();
        editservicecell.ele_dpdwn_provider().click();
        editservicecell.ele_dpddwn_value().contains(updateservicecell.UpdateServiceCell[0].newprovider).click();
        editservicecell.ele_dpdwn_plmnId().click();
        editservicecell.ele_dpddwn_value().contains(updateservicecell.UpdateServiceCell[0].newplmn).click();
        editservicecell.ele_dpdwn_frequency_group().click();
        editservicecell.ele_dpddwn_value().contains(updateservicecell.UpdateServiceCell[0].newfrequenygroup).click();
        editservicecell.ele_dpdwn_gateway().click()
        cy.get('[data-testid="CancelIcon"]').click()
        editservicecell.ele_dpddwn_value().contains(updateservicecell.UpdateServiceCell[0].newgateway).click();
        editservicecell.txtCellPriority().wait(3000).clearThenType(updateservicecell.UpdateServiceCell[0].newcellpriority);
        editservicecell.txtTransmitMode().wait(3000).clearThenType(updateservicecell.UpdateServiceCell[0].newreceivemode);
        editservicecell.txtRecieveMode().wait(3000).clearThenType(updateservicecell.UpdateServiceCell[0].newtransmitmode);
        editservicecell.clickToggleOverridebtn().then(($toggle) => {
            if (!$toggle.is(':checked')) {
                cy.wrap($toggle).click();
            }
        })
        editservicecell.clickbtnUpdate();
        cy.toastMessage(toast.ToastMessages.CreateServiceCell[0].updateServiceCell);

        //check the update service cell page and verify the values are updated in the fields.
        provider.checkvaluetxt().contains('td', '184026').parent().within(() => {
            editservicecell.clickEditicon();
        });
        editservicecell.txtLatitude().should('have.value',updateservicecell.UpdateServiceCell[0].newlatitude);
        editservicecell.txtLongitude().should('have.value',updateservicecell.UpdateServiceCell[0].newlongitude);
        editservicecell.txtAltitude().should('have.value',updateservicecell.UpdateServiceCell[0].newaltitude);
        editservicecell.ele_dpdwn_beam_type().should('have.value',updateservicecell.UpdateServiceCell[0].newbeamtype);
        editservicecell.ele_dpdwn_provider().should('have.value',updateservicecell.UpdateServiceCell[0].newprovider);
        editservicecell.ele_dpdwn_plmnId().should('have.value',updateservicecell.UpdateServiceCell[0].newplmn);
        editservicecell.ele_dpdwn_frequency_group().should('have.value',updateservicecell.UpdateServiceCell[0].newfrequenygroup);
        editservicecell.txtCellPriority().should('have.value',updateservicecell.UpdateServiceCell[0].newcellpriority);
        editservicecell.txtTransmitMode().should('have.value',updateservicecell.UpdateServiceCell[0].newreceivemode);
        editservicecell.txtRecieveMode().should('have.value',updateservicecell.UpdateServiceCell[0].newtransmitmode);       
    })

    it('Verify the cell mapping is not affected when the service cell details are upadted',()=>{
        //Check in the GC the mapping is not affected for the updated service cell, if it is mapped.
        cy.userlogout();
        cy.loginToGC();
        cellMapping.clickGatewayMenubtn()
        cellMapping.clickCellMappingMenubtn()
        
        //Verify mapping for manually created service cell is not affected
        cellMapping.txtServiceCellSearch().type('184026')
        cellMapping.clickServiceCellId();
        cellMapping.txtValueeNodeB2().contains(cellmapping.CellMapping[0].cellpair2.enodeBcell1)
        cellMapping.txtValueeNodeB1().contains(cellmapping.CellMapping[0].cellpair2.enodeBcell2);
       
        //Verify mapping for manually uploaded service cell is not affected
        cellMapping.txtServiceCellSearch().clearThenType('1840178')
        cellMapping.clickServiceCellId();
        cellMapping.txtValueeNodeB2().contains(cellmapping.CellMapping[0].cellpair1.enodeBcell1)
        cellMapping.txtValueeNodeB1().contains(cellmapping.CellMapping[0].cellpair1.enodeBcell2);
       })
})