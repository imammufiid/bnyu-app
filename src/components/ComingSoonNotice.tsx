import {FC} from "react";
import {AlertTriangle} from "lucide-react";

interface ComingSoonNoticeProps {
  title?: string;
  description?: string;
}

const ComingSoonNotice: FC<ComingSoonNoticeProps> = ({
                                                       title = "Feature Unavailable",
                                                       description = "This feature is not available at the moment. We're working on it and it will be available soon!",
                                                     }) => {
  return (
    <div
      className="w-full max-w-xl mx-auto my-10 px-6 py-8 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm text-center">
      <div className="flex flex-col items-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-yellow-500"/>
        <h2 className="text-xl font-semibold text-yellow-800">{title}</h2>
        <p className="text-sm text-yellow-700">{description}</p>
      </div>
    </div>
  );
};

export default ComingSoonNotice;
