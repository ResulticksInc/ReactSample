
Pod::Spec.new do |s|
  s.name         = "RNReiossdkrnSdk"
  s.version      = "1.0.1"
  s.summary      = "RNReiossdkrnSdk"
  s.description  = <<-DESC
                  RNReiossdkrnSdk
                   DESC
  s.homepage     = "https://www.npmjs.com/package/react-native-reiossdkrn-sdk/v/1.0.0"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "10.0"
  s.source       = { :git => "https://github.com/intrsivakumar/RNReiossdkrnSdk.git", :tag => "master" }
  s.source_files  = "RNReiossdkrnSdk/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "REIOSSDK_54b865b8_5123_461a_accf_d12ed01ce383"

end
