import UploadGeoCellPO from "../../../PageObject/CNC/network_planning/PO_upload_geo_cell";
import UploadServiceCellPO from "../../../PageObject/CNC/network_planning/PO_upload_service_cell";
import 'cypress-file-upload';

describe('Upload a geo cell file', () => {

    const uploadgeocell = new UploadServiceCellPO()
    const geocellupload = new UploadGeoCellPO()

    let toast;
    let geocell;
    const baseUrl1 = Cypress.config('baseUrl1');
    const loginUrl = `${baseUrl1}/login`;

    before("Login a user", () => {
        cy.loginToCNC();
    })
    beforeEach("Setting up the fixtures", () => {
        cy.visit(loginUrl);
        cy.fixture('CNC/provider/uploadservicecell.json').then((data) => {
            geocell = data;
        })
        cy.fixture('toaster/toast_messages.json').then((data) => {
            toast = data;
        })
    })

    it('Upload geo cell file', () => {
        uploadgeocell.clickProviderCard();
        uploadgeocell.clickNetworkPlanningCard();
        uploadgeocell.txtNetworkPlanning();
        cy.fixture('CNC/network_planning_files/geo_cells/Geo_cell_USA.csv').then(fileContent => {
            uploadgeocell.ele_upload_csv()
                .attachFile({
                    fileContent,
                    fileName: 'Geo_cell_USA.csv',
                    mimeType: 'text/csv',
                });
            uploadgeocell.ele_dpdwn_type();
            uploadgeocell.ele_dpdwn_value().contains(geocell.uploadfiles[0].type.geocell).click();
            uploadgeocell.ele_dpdwn_country();
            uploadgeocell.ele_dpdwn_value().contains(geocell.uploadfiles[0].country.usa).click();
            uploadgeocell.clickUploadBtn();
            cy.toastMessage(toast.ToastMessages.UploadGeoCell[0].uploadgeocell);
        })
    })

    it('Verify the uploaded geo cells are synced to the respective GC', () => {
        cy.userlogout();
        cy.loginToGC();
        uploadgeocell.clickGatewayMenu();
        geocellupload.clickServiceCellMenubtn();
        geocellupload.clickListview();

    })
})