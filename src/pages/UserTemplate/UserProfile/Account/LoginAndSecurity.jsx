import Shield from "../../../../Icons/Shield";

export default function LoginAndSecurity() {
  return (
    <>
      <div className="flex gap-10">
        <div className="p-5 rounded-xl w-3/5">
          <div className="space-y-5">
            <h1 className="text-3xl font-bold text-gray-700">Đăng nhập</h1>
            <hr />
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h4 className="text-gray-700 text-lg font-medium">Mật khẩu</h4>
                <p className="text-gray-800">Cập nhật lần cuối</p>
              </div>
              <div className="text-cyan-700 transition duration-300 cursor-pointer font-medium text-lg hover:text-cyan-500">
                Cập nhật
              </div>
            </div>
            <hr />
          </div>

          <div className="space-y-5 pt-5">
            <h1 className="text-3xl font-bold text-gray-700">
              Tài khoản mạng xã hội
            </h1>
            <hr />
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h4 className="text-gray-700 text-lg font-medium">Google</h4>
                <p className="text-gray-800">Đã kết nối</p>
              </div>
              <div className="text-cyan-700 transition duration-300 cursor-pointer font-medium text-lg hover:text-cyan-500">
                Ngắt kết nối
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="w-2/5 space-y-5 border p-5 h-fit rounded-xl">
          <Shield />

          <h3 className="text-lg font-bold">Bảo mật tài khoản của bạn</h3>
          <p>
            Chúng tôi thường xuyên xem xét các tài khoản để đảm bảo sự an toàn
            tối đa. Chúng tôi cũng sẽ thông báo cho bạn nếu chúng tôi có thể làm
            nhiều hơn để tăng tính bảo mật của tài khoản của bạn.
          </p>
        </div>
      </div>
      <div className="pl-5">
        <h1 className="text-3xl font-bold text-gray-700 py-5">Tài khoản</h1>
        <div className="flex justify-between items-center py-5">
          <div>Vô hiệu hóa tài khoản của bạn</div>
          <div className="text-orange-700 transition duration-300 cursor-pointer font-medium text-lg hover:text-orange-500">
            Vô hiệu hóa
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}
