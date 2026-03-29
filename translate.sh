

mkdir -p "src/i18n/cn"
mkdir -p "src/i18n/en"
mkdir -p "src/i18n/jp"
mkdir -p "src/i18n/de"
mkdir -p "src/i18n/es"
mkdir -p "src/i18n/fr"
mkdir -p "src/i18n/pt"

price_data=`curl "https://api.vika.cn/fusion/v1/datasheets/dstsaBzUSuKEBh9rZf/records?viewId=viwcJNxLdTSk0&fieldKey=name&pageSize=300" \
  -H "Authorization: Bearer uskVflX5iJGmVUuFryphCLq"`
rcommon_ecords=$(echo "$price_data" | jq '.data.records')
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.EN}' | jq -s 'add')" > src/i18n/en/price.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.CN}' | jq -s 'add')" > src/i18n/cn/price.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.JP}' | jq -s 'add')" > src/i18n/jp/price.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.Es}' | jq -s 'add')" > src/i18n/es/price.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.De}' | jq -s 'add')" > src/i18n/de/price.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.Fr}' | jq -s 'add')" > src/i18n/fr/price.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.Po}' | jq -s 'add')" > src/i18n/pt/price.ts

common_data=`curl "https://api.vika.cn/fusion/v1/datasheets/dstcKLxnC5yN20UW3x/records?viewId=viwcJNxLdTSk0&fieldKey=name&pageSize=200" \
  -H "Authorization: Bearer uskVflX5iJGmVUuFryphCLq"`
rcommon_ecords=$(echo "$common_data" | jq '.data.records')
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.EN}' | jq -s 'add')" > src/i18n/en/common.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.CN}' | jq -s 'add')" > src/i18n/cn/common.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.JP}' | jq -s 'add')" > src/i18n/jp/common.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.Es}' | jq -s 'add')" > src/i18n/es/common.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.De}' | jq -s 'add')" > src/i18n/de/common.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.Fr}' | jq -s 'add')" > src/i18n/fr/common.ts
echo "export default $(echo "$rcommon_ecords" | jq -r '.[] | {(.fields."Key"): .fields.Po}' | jq -s 'add')" > src/i18n/pt/common.ts
