"use client";

import { useQuery } from "@tanstack/react-query";

import { CmsModalDocument } from "@/queries/cms/modal.queries";
import { ModalType } from "@/types";
import { baseHygraphClient } from "@/utils/lib/graphql";

const CMS_MODAL_QUERY_KEY = "cms-modal";

const fetchCmsModal = async (type: ModalType) => {
  if (!type) {
    return;
  }

  const data = await baseHygraphClient("GET").request(CmsModalDocument, {
    modalType: type,
  });

  return data.modal;
};

export const useCmsModalQuery = (type: ModalType) => {
  return useQuery({
    queryKey: [...CMS_MODAL_QUERY_KEY, type],
    queryFn: () => fetchCmsModal(type),
  });
};
