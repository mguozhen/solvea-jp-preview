
### linux install
if ! command -v aws; then
    echo \'[AWS cli] not found. installing...\'
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sh ./aws/install
fi


install_dir=~/.ossutil/
config_dir=~/.ossutilconfig
bin_name=ossutil
bin_dir=$install_dir$bin_name
os_type=$OSTYPE
if [ -z $os_type ]; then
    os_type=Linux
fi


# define os type
echo "OSType: " $os_type
echo "BinDir:" $bin_dir
echo "ConfigDir:" $config_dir
echo

echo 'Initialize [ossutil<aliyun>]'
if ! command -v $bin_dir &> /dev/null; then
    # download ossutil
    tmp_dir=`pwd`
    echo $tmp_dir
    mkdir -p $install_dir
    cd $install_dir
    aliyunOssDownloadUrl=https://gosspublic.alicdn.com/ossutil/1.7.10/ossutil64
    if [ ! -z `echo $OSTYPE | grep darwin` ]; then
        echo 'macOS'
        aliyunOssDownloadUrl=https://gosspublic.alicdn.com/ossutil/1.7.10/ossutilmac64
    fi
    echo download $aliyunOssDownloadUrl
    curl -o $bin_name $aliyunOssDownloadUrl
    chmod 755 $bin_dir
    
    cd $tmp_dir
fi

echo "OSS success."
