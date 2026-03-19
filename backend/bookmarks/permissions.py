from rest_framework.permissions import BasePermission, SAFE_METHODS
class IsOwnerOrReadOnly(BasePermission):
    """
    只有資料擁有者可以修改/刪除。
    非安全方法（PUT/PATCH/DELETE）需要是 owner。
    SAFE_METHODS: GET, HEAD, OPTIONS
    """

    # 在已經找到某個 object 後才檢查
    # DRF 會先抓到這個 object，再跑這個 permission
    def has_object_permission(self, request, view, obj):
        # 讀取類操作
        if request.method in SAFE_METHODS:
            return obj.user == request.user

        # 修改/刪除
        return obj.user == request.user