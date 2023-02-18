import useSettings from './useSettings';
import useAppContext from './useAppContext';
const useIFoodWidget = () => {

    const { loadSettingsValues } = useSettings();
    const { api } = useAppContext();

    const iFoodWidget = window.iFoodWidget;
    const widgetId = 'bec556d4-4188-426c-82cf-1e258b2d10f7'; // Zona Delivery Widget


    function create() {
        if (iFoodWidget) {
            loadSettingsValues().then((settings) => {
                if (settings?.restaurant?.ifoodWidget && settings?.restaurant?.id) {
                    api.listIFoodMerchants(settings.restaurant.id).then((result) => {
                        if (result) {
                            const merchantIds = result.map((merchant) => merchant.merchantId);
                            iFoodWidget.init({
                                widgetId,
                                merchantIds,
                            });
                            iFoodWidget.show()
                        }
                    })
                }
            })
        }
    }

    function destroy() {
        iFoodWidget?.hide()
    }

    const hide = () => iFoodWidget.hide()
    const show = () => iFoodWidget.show()

    return { iFoodWidget, hide, show, create, destroy }
}
export default useIFoodWidget;