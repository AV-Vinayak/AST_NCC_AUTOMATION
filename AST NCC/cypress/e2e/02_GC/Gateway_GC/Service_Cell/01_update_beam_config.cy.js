import UpdateBeamConfigPO from "../../../PageObject/GC/beam_config/update_beam_config";
import CellMappingPO from "../../../PageObject/GC/cell_mapping/PO_cell_mapping";

describe('Update the Beam Config details', () => {

    const baseUrl2 = Cypress.config('baseUrl2');
    const loginUrl = `${baseUrl2}/login`;
    const cellMapping = new CellMappingPO()
    const beamconfig = new UpdateBeamConfigPO()
    let cellmapping;
    let toast;
    let updatebeamconfig;

    before("Login a user", () => {
        cy.loginToGC();
    })
    beforeEach("Setting up the fixtures", () => {
        cy.visit(loginUrl);
        cy.fixture("GC/Cell_Mapping/cell_mapping.json").then((data) => {
            cellmapping = data;
        })
        cy.fixture("GC/Service_Cell/update_beam_config.json").then((data) => {
            updatebeamconfig = data;
        })
        cy.fixture('toaster/toast_messages.json').then((data) => {
            toast = data;
        })
    })

    it('Verify user is able to edit a existing beam configuration details of the service cell', () => {
        cellMapping.clickGatewayMenubtn();
        beamconfig.clickServiceCellMenubtn();
        beamconfig.clickListViewbtn();
        beamconfig.getTableName().contains('td', '18401010').parent().within(() => {
            beamconfig.clickSettingIcon()
        });
        beamconfig.txtCellPriority().clearThenType(updatebeamconfig.BeamConfig[0].beamPriority);
        beamconfig.ele_dpdwn_beamsize();
        beamconfig.ele_dpddwn_value().contains(updatebeamconfig.BeamConfig[0].BeamSize.wide).click();
        beamconfig.ele_dpdwn_beam_cell_bandwidth();
        beamconfig.ele_dpddwn_value().contains(updatebeamconfig.BeamConfig[0].BeamCellBandwidth.bw3).click();
        beamconfig.txtBeamULFreq().clearThenType(updatebeamconfig.BeamConfig[0].BeamUplinkFrequency);
        beamconfig.txtBeamDLFreq().clearThenType(updatebeamconfig.BeamConfig[0].BeamdownlinkFrequency);
        beamconfig.txtBeamDLOutputPower().clearThenType(updatebeamconfig.BeamConfig[0].BeamDownlinkOutputPower);
        beamconfig.toggleOverridebtn().then(($toggle) => {
            if (!$toggle.is(':checked')) {
                cy.wrap($toggle).click();
            }
        });
        beamconfig.clickUpdatebtn()
        cy.toastMessage(toast.ToastMessages.BeamConfiguration[0].updateBeamConfig);

        //Check the overrided details are updated in the Beam Descriptor Page in GC.
        cellMapping.clickGatewayMenubtn();
        beamconfig.clickBeamDescriptorMenubtn();
        beamconfig.getTableName().contains('td', updatebeamconfig.BeamConfig[0].BeamDownlinkOutputPower)
    })

    it('Verify the cell mapping is not affected, when the beam configuration is updated', () => {
        //Verify the cell mapping is not affected, when the beam config details are updated.
        cellMapping.clickGatewayMenubtn()
        cellMapping.clickCellMappingMenubtn()
        cellMapping.txtServiceCellSearch().type('184026')
        cellMapping.clickServiceCellId();

        //Verify mapping for manually created service cell is not affected
        cellMapping.txtValueeNodeB2().contains(cellmapping.CellMapping[0].cellpair2.enodeBcell1)
        cellMapping.txtValueeNodeB1().contains(cellmapping.CellMapping[0].cellpair2.enodeBcell2);

        //Verify mapping for manually uploaded service cell is not affected
        cellMapping.txtServiceCellSearch().clearThenType('1840178')
        cellMapping.clickServiceCellId();
        cellMapping.txtValueeNodeB2().contains(cellmapping.CellMapping[0].cellpair1.enodeBcell1)
        cellMapping.txtValueeNodeB1().contains(cellmapping.CellMapping[0].cellpair1.enodeBcell2);
    })
})