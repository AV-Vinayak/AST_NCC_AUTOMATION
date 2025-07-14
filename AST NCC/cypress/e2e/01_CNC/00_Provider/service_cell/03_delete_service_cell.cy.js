import DeleteServiceCellPO from "../../../PageObject/CNC/service_cell/PO_delete_service_cell";

describe("Delete Service Cell",()=>{

    const baseUrl1 = Cypress.config('baseUrl1');
    const loginUrl = `${baseUrl1}/login`;
    const deleteservicecell = new DeleteServiceCellPO();
    let servicecell;
    let deletecell;
    let toast;

    before("Login a user", () => {
        cy.loginToCNC();
    })
    beforeEach("Setting up the fixtures",()=>{
        cy.visit(loginUrl);
        cy.fixture('CNC/provider/uploadservicecell.json').then((data) => {
            servicecell = data;
        })
        cy.fixture("GC/Cell_Mapping/cell_mapping.json").then((data) => {
            deletecell = data;
        })
        cy.fixture('toaster/toast_messages.json').then((data) => {
            toast = data;
        })
    })

    it("Delete a service cell",()=>{
    deleteservicecell.clickProviderCard();
    deleteservicecell.clickServiceCellCard();
    deleteservicecell.clickListview();
    deleteservicecell.findtablename().contains('td',deletecell.CellMapping[0].gcMid.serviceCellId5).parent().within(() => {
      deleteservicecell.clickDeleteicon();
    });
    deleteservicecell.clickYesbtn();
    cy.toastMessage(toast.ToastMessages.CreateServiceCell[0].deleteServiceCell);
    deleteservicecell.clickListview();
    deleteservicecell.findtablename().should('not.contain','td',deletecell.CellMapping[0].gcMid.serviceCellId5)
    })
})