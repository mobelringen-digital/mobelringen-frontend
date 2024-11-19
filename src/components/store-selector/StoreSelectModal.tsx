import React from "react";

import { RadioGroup } from "@nextui-org/radio";
import { Checkbox } from "@nextui-org/react";

import { Button } from "@/components/_ui/button/Button";
import { PageTopLoader } from "@/components/_ui/loader/PageTopLoader";
import { RadioBlock } from "@/components/_ui/radio/RadioBlock";
import { Modal, ModalActions, ModalContent } from "@/components/modal";
import { SearchInput } from "@/components/search/SearchInput";
import { setFavoriteStoreId } from "@/components/store-selector/actions";
import { BaseStoreFragment } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stores: Array<BaseStoreFragment | null>;
  isAuthorized: boolean;
  selectedStore?: BaseStoreFragment | null;
}

const searchFields: Array<keyof BaseStoreFragment> = [
  "name",
  "postcode",
  "city",
];

export const StoreSelectModal: React.FC<Props> = ({
  isOpen,
  onClose,
  stores,
  selectedStore,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [store, setStore] = React.useState<string | undefined>(
    selectedStore?.external_id ?? undefined,
  );
  const [storesList, setStoresList] = React.useState(stores);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    if (!searchValue) {
      setStoresList(stores);
      return;
    }

    const filteredStores = stores.filter((str) =>
      searchFields.some((field) =>
        str?.[field]
          ?.toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      ),
    );

    setStoresList(filteredStores);
  }, [searchValue, stores]);

  const submitStore = async () => {
    if (!store) return;

    setIsLoading(true);
    return setFavoriteStoreId(store).finally(() => {
      setIsLoading(false);
      setSearchValue("");
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Velg butikk">
      {isLoading ? <PageTopLoader /> : null}
      <form>
        <ModalContent>
          <h2 className="text-lg font-semibold mt-4">Din butikk</h2>
          {selectedStore ? (
            <div className="flex justify-between text-xs lg:text-base border-y border-cold-grey-dark py-2">
              <div className="flex flex-col">
                <p className="font-semibold">{selectedStore?.name}</p>
                <p className="text-dark-grey">
                  {`${selectedStore?.street}, ${selectedStore?.postcode} ${selectedStore?.city}`}
                </p>
              </div>
              <div className="bg-powder flex rounded-2xl px-4 py-2 items-center gap-2">
                <Checkbox
                  className="font-medium text-xs lg:text-bas"
                  title="Min butikk"
                  isSelected={true}
                >
                  Min butikk
                </Checkbox>
              </div>
            </div>
          ) : null}

          <div className="border-b pt-2 pb-4 border-cold-grey-dark">
            <SearchInput
              onChange={onSearchChange}
              variant="bordered"
              placeholder="Skriv postnummer eller sted"
            />
          </div>

          <div className="max-h-64 overflow-y-auto">
            <RadioGroup value={store} onValueChange={setStore} color="primary">
              {storesList.map((storeData) => (
                <RadioBlock
                  key={storeData?.external_id}
                  value={storeData?.external_id ?? ""}
                >
                  {storeData?.name}
                </RadioBlock>
              ))}
            </RadioGroup>
          </div>
        </ModalContent>
        <ModalActions position="end">
          <Button
            aria-labelledby="Fortsette"
            disabled={!store || isLoading}
            onClick={submitStore}
            color="primary"
          >
            Fortsette
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
};
