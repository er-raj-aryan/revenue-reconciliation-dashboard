import UploadCard from "./UploadCard";
import FileDropzone from "@/components/dashboard/FileDropzone";

import useUpload from "@/hooks/useUpload";


interface Props {
  refresh(): void;
}

export default function UploadSection({
  refresh,
}: Props) {

    const orders = useUpload("/api/upload/orders");

const payments = useUpload("/api/upload/payments");
  return (
     
    <div className="grid gap-6 lg:grid-cols-1">

<FileDropzone
  title="Orders CSV"
  file={orders.file}
  loading={orders.loading}
  onSelect={orders.setFile}
  onRemove={() => orders.setFile(null)}
  onUpload={orders.upload}
/>

<FileDropzone
  title="Payments CSV"
  file={payments.file}
  loading={payments.loading}
  onSelect={payments.setFile}
  onRemove={() => payments.setFile(null)}
  onUpload={payments.upload}
/>

</div>
  );
}